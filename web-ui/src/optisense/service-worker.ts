import { openDB, DBSchema } from 'idb';

interface AppSpyDB extends DBSchema {
  'appspy_00_config': { key: string; value: any };
  'appspy_00_ur_matcher': { key: number; value: { id?: number; pattern: string } };
  'appspy_00_request_history': {
    key: number;
    value: {
      id?: number;
      url: string;
      method: string;
      requestHeaders: Record<string, string>;
      requestBody: string | null;
      responseStatus: number;
      responseHeaders: Record<string, string>;
      responseBody: string;
      timestamp: string;
      duration: number;
    };
  };
}

const dbPromise = openDB<AppSpyDB>('AppSpyDB', 1, {
  upgrade(db) {
    db.createObjectStore('appspy_00_config');
    db.createObjectStore('appspy_00_ur_matcher', { keyPath: 'id', autoIncrement: true });
    db.createObjectStore('appspy_00_request_history', { keyPath: 'id', autoIncrement: true });
  },
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(handleFetch(event));
});

async function handleFetch(event: FetchEvent): Promise<Response> {
  const db = await dbPromise;

  // Check if the URL matches any patterns in appspy_00_ur_matcher
  const urlMatchers = await db.getAll('appspy_00_ur_matcher');
  const shouldIntercept = urlMatchers.some(matcher => new RegExp(matcher.pattern).test(event.request.url));

  if (!shouldIntercept) {
    return fetch(event.request);
  }

  const startTime = performance.now();

  // Perform the fetch only once
  const responsePromise = fetch(event.request.clone());

  // Use event.waitUntil to keep the service worker alive for background processing
  event.waitUntil(
    responsePromise.then(async response => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      await saveToIndexedDB(db, event.request.clone(), response.clone(), duration);
    }).catch(error => {
      console.error('Fetch error:', error);
    })
  );

  return responsePromise;
}

async function saveToIndexedDB(db: IDBPDatabase<AppSpyDB>, request: Request, response: Response, duration: number): Promise<void> {
  try {
    const requestBody = await getRequestBody(request);
    const responseBody = await response.text();

    await db.add('appspy_00_request_history', {
      url: request.url,
      method: request.method,
      requestHeaders: Object.fromEntries(request.headers),
      requestBody,
      responseStatus: response.status,
      responseHeaders: Object.fromEntries(response.headers),
      responseBody,
      timestamp: new Date().toISOString(),
      duration
    });

    console.log('Request and response saved to IndexedDB:', request.url);
  } catch (error) {
    console.error('Error saving to IndexedDB:', error);
  }
}

async function getRequestBody(request: Request): Promise<string | null> {
  if (['GET', 'HEAD'].includes(request.method)) {
    return null;
  }
  try {
    return await request.clone().text();
  } catch (error) {
    console.error('Error reading request body:', error);
    return null;
  }
}

// Add this type declaration to make TypeScript recognize FetchEvent
declare global {
  interface ServiceWorkerGlobalScope {
    addEventListener(type: 'fetch', listener: (event: FetchEvent) => void): void;
  }
}