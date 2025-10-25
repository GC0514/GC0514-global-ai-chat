import React, { createContext, useState, useContext, ReactNode, useRef } from 'react';
import { Chat, Message, Country, Persona, WorldEvent, WorldStateMetrics } from '../types';
import { RAW_COUNTRIES, EVENT_KNOWLEDGE_BASE, G7_MEMBERS, BRICS_MEMBERS, SCO_MEMBERS, NATO_MEMBERS, EU_MEMBERS, AU_MEMBERS, ARAB_LEAGUE_MEMBERS, GCC_MEMBERS } from '../../data';
import { generateInitialGoals_RulesBased } from '../services/aiService';

// --- TYPES ---
export type ResponseQueueItem = {
    responderId: string;
    instigator: Country | null;
    chat: Chat;
    messageHistory: Message[];
};

export type RevealedGoal = {
    goal: string;
    turnExpires: number;
}

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
            activePacts: [],
            observerTrust: 100,
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
interface SimulationContextValue {
    countries: Record<string, Country>;
    setCountries: React.Dispatch<React.SetStateAction<Record<string, Country>>>;
    chats: Chat[];
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    activeChatId: string | null;
    setActiveChatId: React.Dispatch<React.SetStateAction<string | null>>;
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    unreadCounts: Record<string, number>;
    setUnreadCounts: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    observerMessageCount: number;
    setObserverMessageCount: React.Dispatch<React.SetStateAction<number>>;
    simulationSpeed: number;
    setSimulationSpeed: React.Dispatch<React.SetStateAction<number>>;
    isPaused: boolean;
    setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
    pausedChatIds: Set<string>;
    setPausedChatIds: React.Dispatch<React.SetStateAction<Set<string>>>;
    closedNewsItems: Set<number>;
    setClosedNewsItems: React.Dispatch<React.SetStateAction<Set<number>>>;
    responseQueue: ResponseQueueItem[];
    setResponseQueue: React.Dispatch<React.SetStateAction<ResponseQueueItem[]>>;
    revealedGoals: Record<string, RevealedGoal>;
    setRevealedGoals: React.Dispatch<React.SetStateAction<Record<string, RevealedGoal>>>;
    worldEvents: WorldEvent[];
    setWorldEvents: React.Dispatch<React.SetStateAction<WorldEvent[]>>;
    worldStateMetrics: WorldStateMetrics | null;
    setWorldStateMetrics: React.Dispatch<React.SetStateAction<WorldStateMetrics | null>>;
    messageIdCounter: React.MutableRefObject<number>;
    turnCounter: React.MutableRefObject<number>;
}

const SimulationContext = createContext<SimulationContextValue | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
    const [countries, setCountries] = useState<Record<string, Country>>(initialState.countries);
    const [chats, setChats] = useState<Chat[]>(initialState.chats);
    const [activeChatId, setActiveChatId] = useState<string | null>('global');
    const [messages, setMessages] = useState<Message[]>(initialState.messages);
    const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
    const [observerMessageCount, setObserverMessageCount] = useState(0);
    const [simulationSpeed, setSimulationSpeed] = useState(2);
    const [isPaused, setIsPaused] = useState(false);
    const [pausedChatIds, setPausedChatIds] = useState<Set<string>>(new Set());
    const [closedNewsItems, setClosedNewsItems] = useState<Set<number>>(new Set());
    const [responseQueue, setResponseQueue] = useState<ResponseQueueItem[]>([]);
    const [revealedGoals, setRevealedGoals] = useState<Record<string, RevealedGoal>>({});
    const [worldEvents, setWorldEvents] = useState<WorldEvent[]>([]);
    const [worldStateMetrics, setWorldStateMetrics] = useState<WorldStateMetrics | null>(null);
    
    const messageIdCounter = useRef(initialState.messages.length + 1);
    const turnCounter = useRef(1);

    const value = {
        countries, setCountries, chats, setChats, activeChatId, setActiveChatId, messages, setMessages,
        unreadCounts, setUnreadCounts, observerMessageCount, setObserverMessageCount,
        simulationSpeed, setSimulationSpeed, isPaused, setIsPaused, pausedChatIds, setPausedChatIds,
        closedNewsItems, setClosedNewsItems, responseQueue, setResponseQueue,
        revealedGoals, setRevealedGoals, worldEvents, setWorldEvents,
        worldStateMetrics, setWorldStateMetrics,
        messageIdCounter, turnCounter
    };

    return (
        <SimulationContext.Provider value={value}>
            {children}
        </SimulationContext.Provider>
    );
};

export const useSimulationContext = () => {
    const context = useContext(SimulationContext);
    if (context === undefined) {
        throw new Error('useSimulationContext must be used within a SimulationProvider');
    }
    return context;
};