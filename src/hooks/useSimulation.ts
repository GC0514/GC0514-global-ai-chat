import { useEffect } from 'react';
import { useSimulationContext } from '../context/SimulationContext';
import { useManagers } from './useManagers';

export const useSimulation = () => {
    const { observerMessageCount, isPaused } = useSimulationContext();
    const { handleAutonomousAiAction } = useManagers();

    useEffect(() => {
        // Trigger an autonomous action every 3 messages from the observer
        if (isPaused) return;
        
        if (observerMessageCount > 0 && observerMessageCount % 3 === 0) {
            handleAutonomousAiAction();
        }
    }, [observerMessageCount, handleAutonomousAiAction, isPaused]);
};