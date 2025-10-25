import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export const useSimulation = () => {
    const { observerMessageCount, handleAutonomousAiAction, isPaused } = useAppContext();

    useEffect(() => {
        // Trigger an autonomous action every 3 messages from the observer
        if (isPaused) return;
        
        if (observerMessageCount > 0 && observerMessageCount % 3 === 0) {
            handleAutonomousAiAction();
        }
    }, [observerMessageCount, handleAutonomousAiAction, isPaused]);
};