import { useCallback, useEffect, useRef } from 'react';
import { useSimulationContext, ResponseQueueItem, RevealedGoal } from '../context/SimulationContext';
import { useSettingsContext } from '../context/SettingsContext';
import { Chat, Message, Country, NewsItem, Pact, WorldEvent } from '../types';
import { simulationService, SimulationUpdate } from '../services/simulationService';
import { playNotificationSound } from '../utils/audio';

// This custom hook manages all simulation actions and logic by connecting the UI to the simulationService.
export const useManagers = () => {
    const { 
        countries, setCountries, chats, setChats, activeChatId, setActiveChatId, messages, setMessages,
        unreadCounts, setUnreadCounts, setObserverMessageCount, simulationSpeed, setSimulationSpeed,
        isPaused, setIsPaused, pausedChatIds, setPausedChatIds, closedNewsItems, setClosedNewsItems,
        responseQueue, setResponseQueue, messageIdCounter, turnCounter, revealedGoals, setRevealedGoals,
        worldEvents, setWorldEvents, setWorldStateMetrics, worldStateMetrics
    } = useSimulationContext();
    
    const { language, aiIntensity, useGeminiAI } = useSettingsContext();
    
    const activeChatIdRef = useRef(activeChatId);
    useEffect(() => { activeChatIdRef.current = activeChatId; }, [activeChatId]);

    // --- State Accessor ---
    const getCurrentState = useCallback(() => ({
        countries, chats, messages, turnCounter: turnCounter.current, revealedGoals, worldEvents, messageIdCounter: messageIdCounter.current
    }), [countries, chats, messages, turnCounter, revealedGoals, worldEvents, messageIdCounter]);


    // --- Update Applier ---
    const applyUpdate = useCallback((update: SimulationUpdate) => {
        if (update.countries) setCountries(update.countries);
        if (update.chats) setChats(update.chats);
        if (update.messages) {
             const newMessages = Array.isArray(update.messages) ? update.messages : [update.messages];
             setMessages(prev => [...prev, ...newMessages]);
             
             newMessages.forEach(msg => {
                if (msg.senderId !== 'observer' && msg.chatId !== activeChatIdRef.current) {
                    setUnreadCounts(prev => ({ ...prev, [msg.chatId]: (prev[msg.chatId] || 0) + 1 }));
                    playNotificationSound();
                }
             });
        }
        if (update.responseQueue) setResponseQueue(prev => [...prev, ...update.responseQueue]);
        if (update.worldEvents) setWorldEvents(prev => [...prev, ...update.worldEvents]);
        if (update.revealedGoals) setRevealedGoals(update.revealedGoals);
        if (update.activeChatId) setActiveChatId(update.activeChatId);
        if (update.worldStateMetrics) setWorldStateMetrics(update.worldStateMetrics);
        if(update.messageIdCounter) messageIdCounter.current = update.messageIdCounter;
        if(update.turnCounter) turnCounter.current = update.turnCounter;

    }, [setCountries, setChats, setMessages, setResponseQueue, setWorldEvents, setRevealedGoals, setActiveChatId, setWorldStateMetrics, messageIdCounter, turnCounter, setUnreadCounts]);


    // --- Observer Actions ---
    const handleSendMessage = useCallback((text: string) => {
        if (!activeChatId) return;
        setObserverMessageCount(prev => prev + 1);
        const update = simulationService.handleObserverMessage(text, activeChatId, getCurrentState());
        applyUpdate(update);
    }, [activeChatId, getCurrentState, applyUpdate, setObserverMessageCount]);

    const handlePostNewsEvent = useCallback((newsItem: NewsItem) => {
        const update = simulationService.postNewsEvent(newsItem, getCurrentState());
        applyUpdate(update);
    }, [getCurrentState, applyUpdate]);
    
    const handleHostSummit = useCallback((theme: string, participants: string[]) => {
        const update = simulationService.hostSummit(theme, participants, getCurrentState());
        applyUpdate(update);
    }, [getCurrentState, applyUpdate]);

    const handleLeakIntel = useCallback((intel: string) => {
        const update = simulationService.leakIntel(intel, getCurrentState());
        applyUpdate(update);
    }, [getCurrentState, applyUpdate]);
    
    const handleProposePact = useCallback((sourceId: string, targetId: string, pactType: Pact['type']) => {
        const update = simulationService.proposePact(sourceId, targetId, pactType, getCurrentState());
        applyUpdate(update);
    }, [getCurrentState, applyUpdate]);

    const handleIntelOperation = useCallback((targetId: string, operationType: 'monitor' | 'sabotage' | 'unrest') => {
        const update = simulationService.handleIntelOperation(targetId, operationType, getCurrentState());
        applyUpdate(update);
    }, [getCurrentState, applyUpdate]);

    // --- Chat Management ---
    const handleStartPrivateChat = useCallback((countryId: string) => {
        const update = simulationService.startPrivateChat(countryId, getCurrentState());
        applyUpdate(update);
    }, [getCurrentState, applyUpdate]);

    const handleClosePrivateChat = useCallback((chatId: string) => {
        setChats(prev => prev.filter(c => c.id !== chatId));
        if (activeChatId === chatId) {
            setActiveChatId('global');
        }
    }, [activeChatId, setChats, setActiveChatId]);
    
    const handleReorderChats = useCallback((draggedId: string, targetId: string) => {
        setChats(prevChats => {
            const draggedIndex = prevChats.findIndex(c => c.id === draggedId);
            const targetIndex = prevChats.findIndex(c => c.id === targetId);
            if (draggedIndex === -1 || targetIndex === -1) return prevChats;
            
            const newChats = [...prevChats];
            const [draggedItem] = newChats.splice(draggedIndex, 1);
            newChats.splice(targetIndex, 0, draggedItem);
            return newChats;
        });
    }, [setChats]);
    
    const handleSelectChat = useCallback((chatId: string) => {
        setActiveChatId(chatId);
        setUnreadCounts(prev => ({ ...prev, [chatId]: 0 }));
    }, [setActiveChatId, setUnreadCounts]);
    
    // --- Simulation & AI Response Processing ---

    useEffect(() => {
        if (isPaused || responseQueue.length === 0) return;

        const item = responseQueue[0];
        if (pausedChatIds.has(item.chat.id)) return;

        const delay = (6 - simulationSpeed) * 1000 + Math.random() * 1500;
        const timer = setTimeout(async () => {
            const update = await simulationService.processAIResponse(item, getCurrentState(), { useGeminiAI, language });
            applyUpdate(update);
            setResponseQueue(q => q.slice(1));
        }, delay);

        return () => clearTimeout(timer);
    }, [responseQueue, isPaused, pausedChatIds, simulationSpeed, getCurrentState, applyUpdate, setResponseQueue, useGeminiAI, language]);

    const handleAutonomousAiAction = useCallback(async () => {
        const update = await simulationService.generateAutonomousAction(getCurrentState(), { useGeminiAI, language });
        if(update) {
            applyUpdate(update);
        }
    }, [getCurrentState, useGeminiAI, language, applyUpdate]);

    const togglePause = () => setIsPaused(p => !p);
    const stopAllAiResponses = () => setResponseQueue([]);
    const toggleChatPause = (chatId: string) => {
        setPausedChatIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(chatId)) newSet.delete(chatId);
            else newSet.add(chatId);
            return newSet;
        });
    };
    const stopAiResponsesForChat = (chatId: string) => {
        setResponseQueue(prev => prev.filter(item => item.chat.id !== chatId));
    };
    const closeNewsItem = (newsId: number) => {
        setClosedNewsItems(prev => new Set(prev).add(newsId));
    };

    return {
        handleSendMessage, handlePostNewsEvent, handleHostSummit, handleLeakIntel,
        handleStartPrivateChat, handleClosePrivateChat, handleReorderChats,
        handleSelectChat, setSimulationSpeed, togglePause, stopAllAiResponses,
        toggleChatPause, stopAiResponsesForChat, handleAutonomousAiAction,
        closeNewsItem, handleProposePact, handleIntelOperation,
    };
};