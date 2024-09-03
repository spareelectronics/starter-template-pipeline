import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Steps } from 'primereact/steps';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const HomePage: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    const tools = [
        { label: 'Deployment', icon: 'pi pi-send' },
        { label: 'Deploy File Builder', icon: 'pi pi-chart-line' },
        { label: 'Deploy File Validator', icon: 'pi pi-sitemap' },
    ];

    const deploymentSteps = [
        { label: 'Cluster Configuration' },
        { label: 'Application Selection' },
        { label: 'Resource Allocation' },
        { label: 'Network Settings' },
        { label: 'Review and Deploy' }
    ];

    const renderDeploymentWizard = () => {
        switch (currentStep) {
            case 0:
                return (
                    <Card title="Cluster Configuration">
                        <p>Configure your Kubernetes cluster settings here.</p>
                        {/* Add form fields for cluster configuration */}
                    </Card>
                );
            case 1:
                return (
                    <Card title="Application Selection">
                        <p>Select the applications you want to deploy.</p>
                        {/* Add application selection interface */}
                    </Card>
                );
            case 2:
                return (
                    <Card title="Resource Allocation">
                        <p>Allocate resources for your applications.</p>
                        {/* Add resource allocation interface */}
                    </Card>
                );
            case 3:
                return (
                    <Card title="Network Settings">
                        <p>Configure network settings for your deployment.</p>
                        {/* Add network configuration interface */}
                    </Card>
                );
            case 4:
                return (
                    <Card title="Review and Deploy">
                        <p>Review your configuration and initiate deployment.</p>
                        {/* Add deployment review and confirmation interface */}
                    </Card>
                );
            default:
                return null;
        }
    };

    return (

        <div className="p-1">
            <h1 className="text-3xl font-bold mb-4 text-center text-blue-200">ClearSky Private Cloud Deployment</h1>

            <Card>
                <div className="card mb-4">
                    <TabMenu model={tools} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                </div>


                <br />


                <div className="card p-4 rounded-lg shadow-lg">
                    {activeIndex === 0 ? (
                        <div>
                            <Steps model={deploymentSteps} activeIndex={currentStep} onSelect={(e) => setCurrentStep(e.index)} className="mb-4" />
                            <div className="mt-4">
                                {renderDeploymentWizard()}
                            </div>
                            <div className="flex justify-content-between mt-4">
                                <Button label="Previous" icon="pi pi-chevron-left" onClick={() => setCurrentStep(Math.max(currentStep - 1, 0))} disabled={currentStep === 0} className="p-button-outlined" />
                                <Button label={currentStep === deploymentSteps.length - 1 ? "Deploy" : "Next"} icon="pi pi-chevron-right" iconPos="right" onClick={() => setCurrentStep(Math.min(currentStep + 1, deploymentSteps.length - 1))} />
                            </div>
                        </div>
                    ) : (
                        <p>Content for {tools[activeIndex].label} tool goes here.</p>
                    )}
                </div>

            </Card>
        </div>

    );
};

export default HomePage;