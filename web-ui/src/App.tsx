import React from 'react';
import { PrimeReactProvider } from 'primereact/api';

import Routing from './routes';

const App: React.FC = () => {
  return (
    <PrimeReactProvider>
      <div className="App">
        <Routing />
      </div>
    </PrimeReactProvider>
  );
}

export default App;