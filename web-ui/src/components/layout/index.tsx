// src/component/layout/index.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppMenuBar } from '../';


const Layout: React.FC = () => {










    return (

        <div className="min-h-screen">
            <AppMenuBar />
            <main className="flex-grow-1 p-3 pt-0">
                <Outlet />
            </main>
        </div>

        // <div className="flex flex-column min-h-screen layout-topbar">
        //     <Header />
        //     <main className="flex-grow-1 p-4">
        //         <Outlet />
        //     </main>
        // </div>
    );
};

export default Layout;