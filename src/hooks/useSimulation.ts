import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export const useSimulation = () => {
    const { observerMessageCount, handleAutonomousAiAction } = useAppContext();

    useEffect(() => {
        // Trigger an autonomous action every 3 messages from the observer
        if (observerMessageCount > 0 && observerMessageCount % 3 === 0) {
            handleAutonomousAiAction();
        }
    }, [observerMessageCount, handleAutonomousAiAction]);
};
