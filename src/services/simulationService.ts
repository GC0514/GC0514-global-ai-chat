import { Chat, Message, Country, NewsItem, Pact, WorldEvent, WorldStateMetrics, PowerBlocMetrics } from '../types';
import { ResponseQueueItem, RevealedGoal } from '../context/SimulationContext';
import { generateAutonomousAction_Gemini, generateAutonomousAction_RulesBased, generateGeminiStatement, generatePrivateResponse_Gemini } from './aiService';
import { G7_MEMBERS, BRICS_MEMBERS, SCO_MEMBERS, NATO_MEMBERS } from '../../data';

// --- TYPE DEFINITIONS ---
export interface SimulationState {
    countries: Record<string, Country>;
    chats: Chat[];
    messages: Message[];
    turnCounter: number;
    revealedGoals: Record<string, RevealedGoal>;
    worldEvents: WorldEvent[];
    messageIdCounter: number;
}

export interface SimulationUpdate {
    countries?: Record<string, Country>;
    chats?: Chat[];
    messages?: Message | Message[];
    responseQueue?: ResponseQueueItem[];
    worldEvents?: WorldEvent[];
    revealedGoals?: Record<string, RevealedGoal>;
    activeChatId?: string;
    worldStateMetrics?: WorldStateMetrics;
    messageIdCounter?: number;
    turnCounter?: number;
}

// --- PURE HELPER FUNCTIONS ---

const createMessage = (message: Omit<Message, 'id' | 'timestamp'>, state: SimulationState): { newMessage: Message, newCounter: number } => ({
    newMessage: { ...message, id: state.messageIdCounter, timestamp: Date.now() },
    newCounter: state.messageIdCounter + 1
});

const createWorldEvent = (event: Omit<WorldEvent, 'id' | 'turn'>, state: SimulationState): WorldEvent => ({
    ...event, id: Date.now(), turn: state.turnCounter
});

const calculateWorldStateMetrics = (countries: Record<string, Country>): WorldStateMetrics => {
    const allCountriesList = Object.values(countries);
    if (allCountriesList.length === 0) {
        const emptyMetrics = { avgEconomicStability: 0, avgDomesticSupport: 0 };
        return { globalEconomicIndex: 0, internationalTensionLevel: 0, activePactsCount: 0, g7Metrics: emptyMetrics, bricsMetrics: emptyMetrics, scoMetrics: emptyMetrics, natoMetrics: emptyMetrics };
    }

    const calculateBlocMetrics = (memberIds: string[]): PowerBlocMetrics => {
        const members = allCountriesList.filter(c => memberIds.includes(c.id));
        if (members.length === 0) return { avgEconomicStability: 0, avgDomesticSupport: 0 };
        const totalEcon = members.reduce((sum, c) => sum + c.economicStability, 0);
        const totalSupport = members.reduce((sum, c) => sum + c.domesticSupport, 0);
        return {
            avgEconomicStability: totalEcon / members.length,
            avgDomesticSupport: totalSupport / members.length,
        };
    };

    const totalEcon = allCountriesList.reduce((sum, c) => sum + c.economicStability, 0);
    const totalMilitaryAlert = allCountriesList.reduce((sum, c) => sum + c.militaryAlertLevel, 0);

    let totalNegativeStanding = 0;
    let rivalRelationships = 0;
    allCountriesList.forEach(c => {
        Object.values(c.relationships).forEach(r => {
            if (r.currentStanding < 0) {
                totalNegativeStanding += r.currentStanding;
                rivalRelationships++;
            }
        });
    });
    const avgNegativeStanding = rivalRelationships > 0 ? Math.abs(totalNegativeStanding / rivalRelationships) : 0;
    let activePactsCount = 0;
    allCountriesList.forEach(c => {
        activePactsCount += c.activePacts.filter(p => p.status === 'active').length;
    });
    const tension = (totalMilitaryAlert / allCountriesList.length) * 0.5 + (avgNegativeStanding * 2);

    return {
        globalEconomicIndex: totalEcon / allCountriesList.length,
        internationalTensionLevel: Math.min(100, tension),
        activePactsCount: activePactsCount / 2, // Each pact is counted twice
        g7Metrics: calculateBlocMetrics(G7_MEMBERS),
        bricsMetrics: calculateBlocMetrics(BRICS_MEMBERS),
        scoMetrics: calculateBlocMetrics(SCO_MEMBERS),
        natoMetrics: calculateBlocMetrics(NATO_MEMBERS),
    };
};

const getDynamicGoal = (country: Country): string => {
    if (country.economicStability < 30) {
        return 'Seek immediate economic aid or establish a new trade agreement to stabilize the economy.';
    }
    if (country.domesticSupport < 35) {
        return 'Initiate a high-profile international summit or take a strong nationalist stance to boost domestic approval.';
    }
    return country.goals.short_term;
};


// --- SIMULATION SERVICE ---

export const simulationService = {

    handleObserverMessage(text: string, chatId: string, state: SimulationState): SimulationUpdate {
        const { newMessage, newCounter } = createMessage({ chatId, senderId: 'observer', text }, state);
        const turnEndUpdate = this.processTurnEnd({ ...state, messages: [...state.messages, newMessage], messageIdCounter: newCounter });

        // FIX: Ensure turnEndUpdate.messages is iterable before spreading
        const additionalMessages = turnEndUpdate.messages ? (Array.isArray(turnEndUpdate.messages) ? turnEndUpdate.messages : [turnEndUpdate.messages]) : [];

        return {
            ...turnEndUpdate,
            messages: [newMessage, ...additionalMessages],
        };
    },
    
    processTurnEnd(state: SimulationState): SimulationUpdate {
        const currentTurn = state.turnCounter + 1;
        let newMessages: Message[] = [];
        let newWorldEvents: WorldEvent[] = [];
        // FIX: Explicitly type newCountries to resolve type errors on properties
        let newCountries: Record<string, Country> = JSON.parse(JSON.stringify(state.countries));
        
        // 1. Turn-based state changes
        for (const id in newCountries) {
            const country = newCountries[id];
            country.economicStability = Math.max(0, Math.min(100, country.economicStability + Math.random() * 2 - 1));
            
            const unexpiredPacts: Pact[] = [];
            country.activePacts.forEach((pact: Pact) => {
                if (pact.status === 'active' && pact.expires <= currentTurn) {
                    const { newMessage } = createMessage({ chatId: pact.id, senderId: 'system', text: `The "${pact.type.replace('_', ' ')}" pact has expired.` }, state);
                    newMessages.push(newMessage);
                    newWorldEvents.push(createWorldEvent({ type: 'pact_expired', description: `The ${pact.type.replace('_',' ')} pact between ${state.countries[pact.participants[0]].name} and ${state.countries[pact.participants[1]].name} has expired.`, relatedCountryIds: pact.participants }, state));
                } else {
                    unexpiredPacts.push(pact);
                }
            });
            country.activePacts = unexpiredPacts;

            const newGoal = getDynamicGoal(country);
            if (newGoal !== country.goals.short_term) {
                newWorldEvents.push(createWorldEvent({ type: 'goal_change', description: `${country.avatar} ${country.name}'s short-term goal has changed to: "${newGoal}"`, relatedCountryIds: [country.id] }, state));
                country.goals.short_term = newGoal;
            }
        }

        // 2. Expire revealed goals
        let newRevealedGoals = { ...state.revealedGoals };
        for (const key in newRevealedGoals) {
            if (newRevealedGoals[key].turnExpires <= currentTurn) {
                delete newRevealedGoals[key];
            }
        }
        
        // 3. Check for world events
        const crisisRoll = Math.random();
        if (crisisRoll > 0.8) {
             const allCountriesList = Object.values(newCountries);
             const lowEconCountries = allCountriesList.filter(c => c.economicStability < 35 && c.tier < 3);
             if (lowEconCountries.length >= 4) {
                 newWorldEvents.push(createWorldEvent({ type: 'world_crisis', description: `Facing widespread slowdowns, a **Global Economic Recession** has begun.`, relatedCountryIds: lowEconCountries.map(c => c.id) }, state));
                 const { newMessage } = createMessage({ chatId: 'global', senderId: 'world_event', title: 'Global Economic Recession', text: 'Multiple major economies are reporting sharp downturns, sparking fears of a global recession.' }, state);
                 newMessages.push(newMessage);
                 for (const id in newCountries) {
                     newCountries[id].economicStability = Math.max(0, newCountries[id].economicStability - 10);
                 }
             }
        }

        const worldStateMetrics = calculateWorldStateMetrics(newCountries);

        return { countries: newCountries, messages: newMessages, worldEvents: newWorldEvents, revealedGoals: newRevealedGoals, turnCounter: currentTurn, worldStateMetrics };
    },

    async processAIResponse(item: ResponseQueueItem, state: SimulationState, config: { useGeminiAI: boolean, language: 'en' | 'zh' }): Promise<SimulationUpdate> {
        let update: SimulationUpdate = {};
        const responder = state.countries[item.responderId];
        if (!responder) return {};

        const responseText = await generateGeminiStatement(responder, item.instigator, item.chat, item.messageHistory, state.countries, config.language);
        if (!responseText) return {};
        
        // Process pact negotiations
        if (item.chat.type === 'pact') {
            const pactId = item.chat.id;
            const isAccepted = responseText.toLowerCase().startsWith('i accept:');
            const isRejected = responseText.toLowerCase().startsWith('i reject:');

            if (isAccepted || isRejected) {
                const newStatus = isAccepted ? 'active' : 'rejected';
                const pact = state.countries[item.responderId].activePacts.find(p => p.id === pactId);
                if(pact) {
                    update.worldEvents = [createWorldEvent({ type: isAccepted ? 'pact_accepted' : 'pact_rejected', description: `The ${pact.type.replace('_',' ')} pact between ${state.countries[pact.participants[0]].name} and ${state.countries[pact.participants[1]].name} was ${newStatus}.`, relatedCountryIds: pact.participants }, state)];
                    
                    let newCountries = JSON.parse(JSON.stringify(state.countries));
                    item.chat.participants.forEach(pId => {
                        newCountries[pId].activePacts = newCountries[pId].activePacts.map((p: Pact) => p.id === pactId ? { ...p, status: newStatus } : p);
                    });
                    update.countries = newCountries;

                    const { newMessage } = createMessage({ chatId: pactId, senderId: 'system', text: `The pact has been formally **${isAccepted ? 'ACCEPTED' : 'REJECTED'}**.` }, state);
                    update.messages = [newMessage];
                }
            }
        }

        const { newMessage: aiMessage, newCounter } = createMessage({ chatId: item.chat.id, senderId: item.responderId, text: responseText }, state);
        
        // FIX: Ensure `update.messages` is treated as an array before spreading to avoid iterator errors.
        const existingMessages = update.messages ? (Array.isArray(update.messages) ? update.messages : [update.messages]) : [];
        update.messages = [...existingMessages, aiMessage];
        update.messageIdCounter = newCounter;
        
        // Process consequences of the AI message (like betrayal)
        // This is a simplified check for now.
        // In a real backend, this would be a more robust NLP check.
        // For now, let's assume it doesn't happen in this step.

        return update;
    },

    async generateAutonomousAction(state: SimulationState, config: { useGeminiAI: boolean, language: 'en' | 'zh' }): Promise<SimulationUpdate | null> {
        const actingCountries = Object.values(state.countries).filter(c => c.persona);
        if (actingCountries.length === 0) return null;
        const actingCountry = actingCountries[Math.floor(Math.random() * actingCountries.length)];

        const action = await generateAutonomousAction_Gemini(actingCountry, state.countries, state.chats, config.language);

        if (action?.type === 'public_message') {
            const { newMessage, newCounter } = createMessage({ chatId: action.payload.chatId, senderId: actingCountry.id, text: action.payload.text }, state);
            return { messages: newMessage, messageIdCounter: newCounter };
        } else if (action?.type === 'start_private_chat') {
            const [p1, p2] = action.payload.participants;
             const existingChat = state.chats.find(c => c.type === 'private' && !c.participants.includes('observer') && c.participants.includes(p1) && c.participants.includes(p2));
            if (existingChat) return null;

            const country1 = state.countries[p1];
            const country2 = state.countries[p2];
            const newChat: Chat = { id: `private_secret_${p1}_${p2}_${Date.now()}`, name: `Secret Channel`, type: 'private', participants: [p1, p2] };
            
            let stateWithMessageCounter = state.messageIdCounter;
            const { newMessage: secretMessage, newCounter: nc1 } = createMessage({ chatId: newChat.id, senderId: p1, text: action.payload.initialMessage }, { ...state, messageIdCounter: stateWithMessageCounter });
            stateWithMessageCounter = nc1;
            const { newMessage: systemMessage, newCounter: nc2 } = createMessage({ chatId: 'global', senderId: 'system', text: `An intelligence source indicates that ${country1.avatar} ${country1.name} has opened a secret back-channel with ${country2.avatar} ${country2.name}.`}, { ...state, messageIdCounter: stateWithMessageCounter });
            stateWithMessageCounter = nc2;

            return { chats: [newChat, ...state.chats], messages: [secretMessage, systemMessage], messageIdCounter: stateWithMessageCounter };
        }
        return null;
    },
    
    // --- DIRECT USER ACTIONS ---

    proposePact(sourceId: string, targetId: string, pactType: Pact['type'], state: SimulationState): SimulationUpdate {
        const sourceCountry = state.countries[sourceId];
        const targetCountry = state.countries[targetId];
        if (!sourceCountry || !targetCountry) return {};
        
        const pactId = `pact_${sourceId}_${targetId}_${Date.now()}`;
        const newChat: Chat = { id: pactId, name: `✍️ Pact: ${sourceCountry.name} & ${targetCountry.name}`, type: 'pact', participants: [sourceId, targetId] };
        const newPact: Pact = { id: pactId, participants: [sourceId, targetId], type: pactType, status: 'proposed', proposer: sourceId, expires: state.turnCounter + 20 };

        let newCountries = JSON.parse(JSON.stringify(state.countries));
        newCountries[sourceId].activePacts = [...newCountries[sourceId].activePacts, newPact];
        newCountries[targetId].activePacts = [...newCountries[targetId].activePacts, newPact];

        const { newMessage, newCounter } = createMessage({ chatId: pactId, senderId: 'system', text: `The Observer has proposed a **${pactType.replace('_', ' ')}** pact. ${targetCountry.avatar} ${targetCountry.name}, you have the floor to respond.` }, state);

        const newResponseQueueItem: ResponseQueueItem = {
            responderId: targetId,
            instigator: null,
            chat: newChat,
            messageHistory: [...state.messages, newMessage],
        };

        return {
            countries: newCountries,
            chats: [newChat, ...state.chats],
            messages: newMessage,
            responseQueue: [newResponseQueueItem],
            activeChatId: pactId,
            worldEvents: [createWorldEvent({ type: 'pact_proposed', description: `A ${pactType.replace('_',' ')} pact was proposed between ${sourceCountry.avatar} ${sourceCountry.name} and ${targetCountry.avatar} ${targetCountry.name}.`, relatedCountryIds: [sourceId, targetId] }, state)],
            messageIdCounter: newCounter
        };
    },

    handleIntelOperation(targetId: string, operationType: 'monitor' | 'sabotage' | 'unrest', state: SimulationState): SimulationUpdate {
        const target = state.countries[targetId];
        if (!target) return {};

        let successChance = 0.7 + (target.observerTrust / 500);
        let trustPenalty = 15;
        let alertPenalty = 5;
        if (operationType === 'sabotage') {
            successChance = 0.4 + (target.observerTrust / 1000);
            trustPenalty = 35;
            alertPenalty = 15;
        } else if (operationType === 'unrest') {
            successChance = 0.4 + (target.observerTrust / 1000);
            trustPenalty = 30;
            alertPenalty = 10;
        }
        
        const roll = Math.random();
        let newCountries = JSON.parse(JSON.stringify(state.countries));
        const newTarget = newCountries[targetId];
        let messages: Message[] = [];
        let worldEvents: WorldEvent[] = [];
        let revealedGoals = { ...state.revealedGoals };
        let messageIdCounter = state.messageIdCounter;

        if (roll < successChance) {
            worldEvents.push(createWorldEvent({ type: 'intel_success', description: `A covert '${operationType}' operation against ${target.avatar} ${target.name} succeeded.`, relatedCountryIds: [targetId] }, state));
            const { newMessage, newCounter } = createMessage({ chatId: 'global', senderId: 'system', text: `Internal Memo: Operation [${operationType}] against ${target.avatar} ${target.name} was a success.` }, { ...state, messageIdCounter });
            messages.push(newMessage);
            messageIdCounter = newCounter;

            if (operationType === 'sabotage') newTarget.economicStability = Math.max(0, newTarget.economicStability - 15);
            if (operationType === 'unrest') newTarget.domesticSupport = Math.max(0, newTarget.domesticSupport - 15);
            if (operationType === 'monitor') revealedGoals[targetId] = { goal: target.goals.short_term, turnExpires: state.turnCounter + 5 };
        } else {
            worldEvents.push(createWorldEvent({ type: 'intel_failure', description: `A covert '${operationType}' operation targeting ${target.avatar} ${target.name} was exposed.`, relatedCountryIds: [targetId] }, state));
            const { newMessage, newCounter } = createMessage({ chatId: 'global', senderId: 'system', text: `⚠️ Intelligence sources report a failed covert operation targeting ${target.avatar} ${target.name}. International observers are suspected.` }, { ...state, messageIdCounter });
            messages.push(newMessage);
            messageIdCounter = newCounter;

            newTarget.observerTrust = Math.max(0, newTarget.observerTrust - trustPenalty);
            newTarget.militaryAlertLevel = Math.min(100, newTarget.militaryAlertLevel + alertPenalty);
            newTarget.goals.short_term = `Identify and counteract the source of the recent covert action against our nation.`;
        }
        newCountries[targetId] = newTarget;
        return { countries: newCountries, messages, worldEvents, revealedGoals, messageIdCounter };
    },
    
    startPrivateChat(countryId: string, state: SimulationState): SimulationUpdate {
        const existingChat = state.chats.find(c => c.type === 'private' && c.participants.includes('observer') && c.participants.includes(countryId));
        if (existingChat) {
            return { activeChatId: existingChat.id };
        }
        const country = state.countries[countryId];
        const newChat: Chat = { id: `private_${countryId}_${Date.now()}`, name: country.name, type: 'private', participants: ['observer', countryId] };
        const { newMessage, newCounter } = createMessage({ chatId: newChat.id, senderId: 'system', text: `You have opened a private channel with ${country.name}.` }, state);
        return { chats: [newChat, ...state.chats], activeChatId: newChat.id, messages: newMessage, messageIdCounter: newCounter };
    },

    postNewsEvent(newsItem: NewsItem, state: SimulationState): SimulationUpdate {
        const { newMessage, newCounter } = createMessage({ chatId: 'global', senderId: 'news_flash', title: newsItem.title, text: newsItem.snippet, isFabricated: newsItem.isFabricated }, state);
        const newWorldEvent = createWorldEvent({ type: 'news_published', description: `📰 News Published: "${newsItem.title}"`, relatedCountryIds: newsItem.involved_countries || [] }, state);
        return { messages: newMessage, worldEvents: [newWorldEvent], messageIdCounter: newCounter };
    },
    
    hostSummit(theme: string, participants: string[], state: SimulationState): SimulationUpdate {
        const newChat: Chat = { id: `summit_${Date.now()}`, name: `🏛️ Summit: ${theme}`, type: 'summit', participants: ['observer', ...participants] };
        const { newMessage, newCounter } = createMessage({ chatId: newChat.id, senderId: 'system', text: `The Observer has convened a summit on "${theme}".` }, state);
        return { chats: [newChat, ...state.chats], activeChatId: newChat.id, messages: newMessage, messageIdCounter: newCounter };
    },

    leakIntel(intel: string, state: SimulationState): SimulationUpdate {
        const { newMessage, newCounter } = createMessage({ chatId: 'global', senderId: 'intel_leak', text: intel }, state);
        return { messages: newMessage, messageIdCounter: newCounter };
    }
};