import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';

const AppMenuBar: React.FC = () => {
    const startContent = (
        <div className="text-xl font-bold text-blue-100">ClearSky</div>
    );

    const centerContent = (
        <div className="flex align-items-center gap-3">
            <Button label="Deploy" severity="info" icon="pi pi-cloud" rounded outlined />
            <Button label="Monitor" severity="info" icon="pi pi-chart-line" rounded outlined />
        </div>
    );

    const endContent = (
        <div className="flex align-items-center gap-2">
            <Avatar icon="pi pi-gear" className="bg-blue-600" style={{ color: 'var(--blue-100)' }} size="large" shape="circle" />
        </div>
    );

    return (
        <div className="p-4">
            <div className="card relative">
                <Toolbar
                    start={startContent}
                    center={centerContent}
                    end={endContent}
                    className="shadow-2"
                    style={{
                        borderRadius: '3rem',
                        backgroundImage: 'linear-gradient(to right, var(--blue-800), var(--blue-700))',
                        padding: '0.5rem 2rem',
                        overflow: 'hidden'
                    }}
                />
            </div>
        </div>
    );
};

export default AppMenuBar;