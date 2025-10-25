import React, { createContext, useState, useContext, useEffect, useRef, ReactNode } from 'react';
import { Chat, Message, AiIntensity, Country, NewsItem, Persona } from '../types';
import { RAW_COUNTRIES, EVENT_KNOWLEDGE_BASE, BREAKING_NEWS_OPTIONS, TRANSLATIONS, G7_MEMBERS, BRICS_MEMBERS, SCO_MEMBERS, NATO_MEMBERS, EU_MEMBERS, AU_MEMBERS, ARAB_LEAGUE_MEMBERS, GCC_MEMBERS } from '../../data';
import { generatePublicResponse, generatePrivateResponse_RulesBased, evaluateAndGetRelationshipUpdates, generateInitialGoals_RulesBased, generateSecretDiplomacy, generateAutonomousAction_RulesBased, generateAutonomousAction_Gemini } from '../services/aiService';
import { playNotificationSound } from '../utils/audio';

// --- INITIAL STATE ---

const initializeAppState = () => {
    const processedCountries: Record<string, any> = {};
    const countryIds = Object.keys(RAW_COUNTRIES);

    for (const id of countryIds) {
        const raw = RAW_COUNTRIES[id];
        processedCountries[id] = {
            ...raw,
            relationships: {},
            goals: { short_term: 'Assess global situation.', long_term: 'Ensure national prosperity and security.' },
            persona: raw.persona as Persona | undefined,
            economicStability: 50 + Math.floor(Math.random() * 20) - 10,
            domesticSupport: 50 + Math.floor(Math.random() * 20) - 10,
            militaryAlertLevel: 10 + Math.floor(Math.random() * 10),
            privateConsensus: [],
        };
        if (processedCountries[id].persona && 'relationship_matrix' in processedCountries[id].persona) {
            delete processedCountries[id].persona.relationship_matrix;
        }
    }

    const countriesWithGoals = generateInitialGoals_RulesBased(processedCountries, EVENT_KNOWLEDGE_BASE);

    for (const idA of countryIds) {
        const countryA = countriesWithGoals[idA];
        const personaA = RAW_COUNTRIES[idA].persona;

        for (const idB of countryIds) {
            if (idA === idB) continue;
            let strategicAlignment = 0;
            if (personaA?.relationship_matrix) {
                if (personaA.relationship_matrix.allies.includes(idB)) strategicAlignment = 8;
                else if (personaA.relationship_matrix.rivals.includes(idB)) strategicAlignment = -8;
            }
            countryA.relationships[idB] = { strategicAlignment, currentStanding: 0 };
        }
    }

    const initialChats: Chat[] = [
        { id: 'global', name: '🌍 Global Country Chat', type: 'group', participants: ['observer', ...Object.keys(countriesWithGoals)] },
        { id: 'g7', name: '🤝 G7', type: 'group', participants: ['observer', ...G7_MEMBERS] },
        { id: 'brics', name: '🧱 BRICS', type: 'group', participants: ['observer', ...BRICS_MEMBERS] },
        { id: 'sco', name: '🌐 Shanghai Cooperation Organisation', type: 'group', participants: ['observer', ...SCO_MEMBERS] },
        { id: 'nato', name: '🛡️ NATO', type: 'group', participants: ['observer', ...NATO_MEMBERS] },
        { id: 'eu', name: '🇪🇺 European Union', type: 'group', participants: ['observer', ...EU_MEMBERS] },
        { id: 'au', name: '🌍 African Union', type: 'group', participants: ['observer', ...AU_MEMBERS] },
        { id: 'arab_league', name: '🕊️ Arab League', type: 'group', participants: ['observer', ...ARAB_LEAGUE_MEMBERS] },
        { id: 'gcc', name: '⭐ Gulf Cooperation Council', type: 'group', participants: ['observer', ...GCC_MEMBERS] },
    ];

    const initialMessages: Message[] = [
        { id: 1, chatId: 'global', senderId: 'USA', text: 'Welcome delegates. The United States calls this session of the Global Country Chat to order. We have much to discuss.', timestamp: Date.now() - 300000 },
        { id: 2, chatId: 'global', senderId: 'CHN', text: 'China is present and looks forward to a productive discussion based on mutual respect and non-interference.', timestamp: Date.now() - 240000 },
        { id: 3, chatId: 'g7', senderId: 'GBR', text: 'G7 members, an urgent matter has been brought to our attention regarding global economic stability.', timestamp: Date.now() - 120000 },
    ];

    return {
        countries: countriesWithGoals as Record<string, Country>,
        chats: initialChats,
        messages: initialMessages,
    };
};

const initialState = initializeAppState();

// --- CONTEXT DEFINITION ---

interface AppContextValue {
    countries: Record<string, Country>;
    chats: Chat[];
    activeChatId: string | null;
    messages: Message[];
    modalCountry: Country | null;
    activeView: 'chats' | 'directory';
    isSettingsOpen: boolean;
    isSummitModalOpen: boolean;
    isIntelModalOpen: boolean;
    theme: 'dark' | 'light';
    language: 'en' | 'zh';
    aiIntensity: AiIntensity;
    useGeminiAI: boolean;
    unreadCounts: Record<string, number>;
    observerMessageCount: number;
    t: Record<string, any>;
    activeChat: Chat | undefined;
    simulationSpeed: number;
    isPaused: boolean;

    setCountries: React.Dispatch<React.SetStateAction<Record<string, Country>>>;
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    setActiveChatId: React.Dispatch<React.SetStateAction<string | null>>;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    setModalCountry: React.Dispatch<React.SetStateAction<Country | null>>;
    setActiveView: React.Dispatch<React.SetStateAction<'chats' | 'directory'>>;
    setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSummitModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIntelModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTheme: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
    setLanguage: React.Dispatch<React.SetStateAction<'en' | 'zh'>>;
    setAiIntensity: React.Dispatch<React.SetStateAction<AiIntensity>>;
    setUseGeminiAI: React.Dispatch<React.SetStateAction<boolean>>;
    setUnreadCounts: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    setObserverMessageCount: React.Dispatch<React.SetStateAction<number>>;
    setSimulationSpeed: React.Dispatch<React.SetStateAction<number>>;
    togglePause: () => void;
    stopAllAiResponses: () => void;

    addMessage: (msg: Message) => void;
    addMessagesWithDelay: (msgs: Message[]) => void;
    handleSelectChat: (chatId: string) => void;
    handleSendMessage: (text: string) => void;
    handleAutonomousAiAction: () => void;
    handlePostNewsEvent: (newsItem: NewsItem) => void;
    handleHostSummit: (theme: string, participants: string[]) => void;
    handleLeakIntel: (intel: string) => void;
    handleStartPrivateChat: (countryId: string) => void;
    handleClosePrivateChat: (chatId: string) => void;
    handleReorderChats: (draggedId: string, targetId: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

// --- PROVIDER COMPONENT ---

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [countries, setCountries] = useState<Record<string, Country>>(initialState.countries);
    const [chats, setChats] = useState<Chat[]>(initialState.chats);
    const [activeChatId, setActiveChatId] = useState<string | null>('global');
    const [messages, setMessages] = useState<Message[]>(initialState.messages);
    const [modalCountry, setModalCountry] = useState<Country | null>(null);
    const [activeView, setActiveView] = useState<'chats' | 'directory'>('chats');
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const [isSummitModalOpen, setSummitModalOpen] = useState(false);
    const [isIntelModalOpen, setIntelModalOpen] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('light');
    const [language, setLanguage] = useState<'en' | 'zh'>('zh');
    const [aiIntensity, setAiIntensity] = useState<AiIntensity>('medium');
    const [useGeminiAI, setUseGeminiAI] = useState<boolean>(true);
    const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
    const [observerMessageCount, setObserverMessageCount] = useState(0);
    const [simulationSpeed, setSimulationSpeed] = useState(2); // 1 (slow) to 5 (fast)
    const [isPaused, setIsPaused] = useState(false);

    const messageIdCounter = useRef(initialState.messages.length + 1);
    const turnCounter = useRef(1);
    const activeChatIdRef = useRef(activeChatId);
    const pendingTimeoutsRef = useRef<number[]>([]);

    const t = TRANSLATIONS[language];
    const activeChat = chats.find(c => c.id === activeChatId);

    useEffect(() => { activeChatIdRef.current = activeChatId; }, [activeChatId]);
    useEffect(() => { document.body.className = `theme-${theme}`; }, [theme]);
    
    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            pendingTimeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
        };
    }, []);

    const addMessage = (msg: Message) => {
        const chatContext = chats.find(c => c.id === msg.chatId);
        if (!chatContext) return;
        
        const isNewMessageForInactiveChat = msg.senderId !== 'observer' && msg.chatId !== activeChatIdRef.current;

        setMessages(prev => [...prev, msg]);
        if (isNewMessageForInactiveChat) {
             setUnreadCounts(prev => ({ ...prev, [msg.chatId]: (prev[msg.chatId] || 0) + 1 }));
        }

        handleRelationshipUpdates(msg, chatContext);
        handleStatUpdates(msg, chatContext);

        const diplomacy = generateSecretDiplomacy(msg, chatContext, countries, turnCounter.current);
        if (diplomacy.systemMessage) {
            setMessages(prev => [...prev, diplomacy.systemMessage!]);
            setCountries(prev => {
                const newCountries = { ...prev };
                Object.keys(diplomacy.countryUpdates).forEach(id => {
                    newCountries[id] = { ...newCountries[id], ...diplomacy.countryUpdates[id] };
                });
                return newCountries;
            });
        }
    };
    
    const addMessagesWithDelay = (msgs: Message[]) => {
        stopAllAiResponses(); // Clear any existing queue before starting a new one
        let cumulativeDelay = 0;
        msgs.forEach((res) => {
            const baseDelay = (6 - simulationSpeed) * 4000; 
            const randomJitter = baseDelay * 0.5;
            const delay = baseDelay - randomJitter / 2 + Math.random() * randomJitter;
            
            cumulativeDelay += delay;

            const timeoutId = window.setTimeout(() => {
                addMessage(res);
                playNotificationSound();
                pendingTimeoutsRef.current = pendingTimeoutsRef.current.filter(id => id !== timeoutId);
            }, cumulativeDelay);
            pendingTimeoutsRef.current.push(timeoutId);
        });
    };

    const stopAllAiResponses = () => {
        pendingTimeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
        pendingTimeoutsRef.current = [];
    };
    
    const togglePause = () => {
        setIsPaused(prev => {
            const newPausedState = !prev;
            if (newPausedState) { // When pausing, clear all pending AI responses.
                stopAllAiResponses();
            }
            return newPausedState;
        });
    };

    const handleStatUpdates = (message: Message, chat: Chat) => {
        const statChanges: Record<string, { eco?: number; sup?: number; mil?: number }> = {};
        const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

        const applyChange = (id: string, change: { eco?: number; sup?: number; mil?: number }) => {
            if (!statChanges[id]) statChanges[id] = {};
            statChanges[id].eco = (statChanges[id].eco || 0) + (change.eco || 0);
            statChanges[id].sup = (statChanges[id].sup || 0) + (change.sup || 0);
            statChanges[id].mil = (statChanges[id].mil || 0) + (change.mil || 0);
        };

        if (message.senderId === 'news_flash') {
            const allParticipants = Object.keys(countries);
            if (message.title?.includes('Fusion Energy')) {
                allParticipants.forEach(id => applyChange(id, { eco: 5 }));
            } else if (message.title?.includes('Grain Shortage')) {
                allParticipants.forEach(id => applyChange(id, { eco: -10, sup: -5 }));
            } else if (message.title?.includes('Data Cable Severed')) {
                allParticipants.forEach(id => applyChange(id, { mil: 15 }));
            }
        } else if (message.senderId === 'intel_leak') {
            chat.participants.filter(p => p !== 'observer').forEach(id => applyChange(id, { sup: -5, mil: 10 }));
        } else if (message.senderId !== 'observer' && message.senderId !== 'system') {
            const relationshipUpdates = evaluateAndGetRelationshipUpdates(message, chat, countries);
            for (const countryId in relationshipUpdates) {
                if (relationshipUpdates[countryId].change < 0) { // Conflict
                    applyChange(countryId, { mil: 2 });
                    applyChange(message.senderId, { mil: 2 });
                }
            }
        }

        if (Object.keys(statChanges).length > 0) {
            setCountries(prev => {
                const newCountries = { ...prev };
                for (const id in statChanges) {
                    if (newCountries[id]) {
                        newCountries[id] = {
                            ...newCountries[id],
                            economicStability: clamp((newCountries[id].economicStability || 50) + (statChanges[id].eco || 0), 0, 100),
                            domesticSupport: clamp((newCountries[id].domesticSupport || 50) + (statChanges[id].sup || 0), 0, 100),
                            militaryAlertLevel: clamp((newCountries[id].militaryAlertLevel || 10) + (statChanges[id].mil || 0), 0, 100),
                        };
                    }
                }
                return newCountries;
            });
        }
    };

    const handleRelationshipUpdates = (message: Message, chat: Chat) => {
        const updates = evaluateAndGetRelationshipUpdates(message, chat, countries);
        if (Object.keys(updates).length === 0) return;

        setCountries(prevCountries => {
            const newCountries = { ...prevCountries };
            for (const countryId in updates) {
                const { targetId, change } = updates[countryId];
                if (newCountries[countryId]?.relationships[targetId]) {
                    newCountries[countryId].relationships[targetId].currentStanding += change;
                }
                if (newCountries[targetId]?.relationships[countryId]) {
                     newCountries[targetId].relationships[countryId].currentStanding += change;
                }
            }
            return newCountries;
        });
    };

    const handleSelectChat = (chatId: string) => {
        setActiveChatId(chatId);
        if (unreadCounts[chatId]) {
            setUnreadCounts(prev => ({ ...prev, [chatId]: 0 }));
        }
    };
    
    const handleSendMessage = async (text: string) => {
        if (!activeChat || isPaused) return;
        turnCounter.current++;
        const newMessage: Message = { id: messageIdCounter.current++, chatId: activeChat.id, senderId: 'observer', text, timestamp: Date.now() };
        addMessage(newMessage);
        setObserverMessageCount(prev => prev + 1);
        
        const messageHistory = [...messages, newMessage];
        if (activeChat.type === 'private') {
            addMessage(generatePrivateResponse_RulesBased(newMessage, activeChat, countries, messageHistory));
        } else if (activeChat.type === 'group' || activeChat.type === 'summit') {
            const responses = await generatePublicResponse(newMessage, activeChat, aiIntensity, countries, messageHistory, turnCounter.current, useGeminiAI, language);
            addMessagesWithDelay(responses);
        }
    };

    const handleAutonomousAiAction = async () => {
        if (isPaused) return;
        turnCounter.current++;
        const actingCountry = (() => {
            const tiers: Record<number, Country[]> = { 1: [], 2: [], 3: [] };
            Object.values(countries).forEach((c: Country) => c.persona && tiers[c.tier].push(c));
            const rand = Math.random();
            if (rand < 0.6 && tiers[1].length > 0) return tiers[1][Math.floor(Math.random() * tiers[1].length)];
            if (rand < 0.9 && tiers[2].length > 0) return tiers[2][Math.floor(Math.random() * tiers[2].length)];
            if (tiers[3].length > 0) return tiers[3][Math.floor(Math.random() * tiers[3].length)];
            return Object.values(countries).find((c: Country) => c.persona)!;
        })();

        const action = useGeminiAI 
            ? await generateAutonomousAction_Gemini(actingCountry, countries, chats, language)
            : generateAutonomousAction_RulesBased(actingCountry, countries, chats, turnCounter.current);

        if (!action || action.type === 'do_nothing') return;

        if (action.type === 'public_message') {
            const message: Message = { id: messageIdCounter.current++, chatId: action.payload.chatId, senderId: actingCountry.id, text: action.payload.text, timestamp: Date.now() };
            addMessage(message);
            const chatContext = chats.find(c => c.id === action.payload.chatId)!;
            const responses = await generatePublicResponse(message, chatContext, aiIntensity, countries, [...messages, message], turnCounter.current, useGeminiAI, language);
            addMessagesWithDelay(responses);
        } else if (action.type === 'start_private_chat') {
            const { participants, initialMessage } = action.payload;
            const sortedIds = participants.sort();
            const chatId = `private_${sortedIds.join('_')}`;

            if (chats.some(c => c.id === chatId)) return;
            
            const countryA = countries[participants[0]];
            const countryB = countries[participants[1]];

            const newChat: Chat = { id: chatId, name: `🤝 ${countryA.name} & ${countryB.name}`, type: 'private', participants: sortedIds };
            const systemAnnouncement: Message = { id: messageIdCounter.current++, chatId: 'global', senderId: 'system', text: `System Notification: ${countryA.avatar} ${countryA.name} and ${countryB.avatar} ${countryB.name} have opened a private channel.`, timestamp: Date.now() };
            addMessage(systemAnnouncement);
            setChats(prev => [newChat, ...prev]);

            const firstMessage: Message = { id: messageIdCounter.current++, chatId: chatId, senderId: actingCountry.id, text: initialMessage, timestamp: Date.now() + 100 };
            addMessage(firstMessage);
            
            const response = generatePrivateResponse_RulesBased(firstMessage, newChat, countries, [firstMessage]);
            setTimeout(() => addMessage(response), 1000);
        }
    };


    const handlePostNewsEvent = async (newsItem: NewsItem) => {
        if (isPaused) return;
        const globalChat = chats.find(c => c.id === 'global');
        if (!globalChat) return;
        turnCounter.current++;
        const newsMessage: Message = { id: messageIdCounter.current++, chatId: 'global', senderId: 'news_flash', title: newsItem.title, text: newsItem.snippet, timestamp: Date.now(), isFabricated: newsItem.isFabricated };
        addMessage(newsMessage);
        
        const messageHistory = [...messages, newsMessage];
        const intensity = newsItem.isFabricated ? 'high' : aiIntensity;
        const responses = await generatePublicResponse(newsMessage, globalChat, intensity, countries, messageHistory, turnCounter.current, useGeminiAI, language);
        addMessagesWithDelay(responses);
    };

    const handleHostSummit = async (theme: string, participants: string[]) => {
        if (isPaused) return;
        const summitId = `summit_${Date.now()}`;
        const newChat: Chat = { id: summitId, name: `🏛️ ${theme}`, type: 'summit', participants: ['observer', ...participants] };
        setChats(prev => [newChat, ...prev]);
        
        setCountries(prev => {
            const newCountries = {...prev};
            const hostId = newChat.participants[1];
            if(newCountries[hostId]) {
                newCountries[hostId].domesticSupport = Math.min(100, (newCountries[hostId].domesticSupport || 50) + 10);
            }
            return newCountries;
        });

        const announcement: Message = { id: messageIdCounter.current++, chatId: summitId, senderId: 'system', text: `【Summit Announcement】: This summit has officially begun. The topic is '${theme}'.`, timestamp: Date.now() };
        addMessage(announcement);
        setSummitModalOpen(false);
        handleSelectChat(summitId);
        
        const responses = await generatePublicResponse(announcement, newChat, 'high', countries, [announcement], turnCounter.current, useGeminiAI, language);
        addMessagesWithDelay(responses);
    };

    const handleLeakIntel = async (intel: string) => {
        if (!activeChat || isPaused) return;
        turnCounter.current++;
        const intelMessage: Message = { id: messageIdCounter.current++, chatId: activeChat.id, senderId: 'intel_leak', text: intel, timestamp: Date.now() };
        addMessage(intelMessage);
        setIntelModalOpen(false);
        
        const responses = await generatePublicResponse(intelMessage, activeChat, aiIntensity, countries, [...messages, intelMessage], turnCounter.current, useGeminiAI, language);
        addMessagesWithDelay(responses);
    };

    const handleStartPrivateChat = (countryId: string) => {
        const privateChatId = `private_observer_${countryId}`;
        const existingChat = chats.find(c => c.id === privateChatId);
        if (existingChat) {
            handleSelectChat(existingChat.id);
        } else {
            const country = countries[countryId];
            const newChat: Chat = { id: privateChatId, name: `${country.avatar} ${country.name}`, type: 'private', participants: ['observer', countryId] };
            setChats(prev => [newChat, ...prev.filter(c => c.type !== 'private' || c.id === privateChatId)]);
            handleSelectChat(newChat.id);
        }
        setModalCountry(null);
        setActiveView('chats');
    };

    const handleClosePrivateChat = (chatId: string) => {
        setChats(prev => prev.filter(c => c.id !== chatId));
        if (activeChatId === chatId) setActiveChatId('global');
    };

    const handleReorderChats = (draggedId: string, targetId: string) => {
        if (draggedId === targetId) return;
        setChats(prevChats => {
            const newChats = [...prevChats];
            const draggedItem = newChats.find(c => c.id === draggedId);
            if (!draggedItem) return prevChats;
            const draggedIndex = newChats.findIndex(c => c.id === draggedId);
            newChats.splice(draggedIndex, 1);
            const targetIndex = newChats.findIndex(c => c.id === targetId);
            newChats.splice(targetIndex, 0, draggedItem);
            return newChats;
        });
    };

    const value = {
        countries, setCountries, chats, setChats, activeChatId, setActiveChatId, messages, setMessages, modalCountry, setModalCountry,
        activeView, setActiveView, isSettingsOpen, setSettingsOpen, isSummitModalOpen, setSummitModalOpen, isIntelModalOpen, setIntelModalOpen,
        theme, setTheme, language, setLanguage, aiIntensity, setAiIntensity, useGeminiAI, setUseGeminiAI, unreadCounts, setUnreadCounts, observerMessageCount, setObserverMessageCount,
        t, activeChat, simulationSpeed, setSimulationSpeed, isPaused, togglePause, stopAllAiResponses,
        addMessage, addMessagesWithDelay, handleSelectChat, handleSendMessage, handleAutonomousAiAction,
        handlePostNewsEvent, handleHostSummit, handleLeakIntel, handleStartPrivateChat, handleClosePrivateChat, handleReorderChats
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// --- CUSTOM HOOK ---

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};