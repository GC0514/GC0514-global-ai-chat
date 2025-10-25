import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { SettingsProvider } from './src/context/SettingsContext';
import { SimulationProvider } from './src/context/SimulationContext';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <SettingsProvider>
            <SimulationProvider>
                <App />
            </SimulationProvider>
        </SettingsProvider>
    </React.StrictMode>
);