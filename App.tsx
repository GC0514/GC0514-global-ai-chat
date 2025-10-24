

import React, { useState, useEffect, useRef } from 'react';
import { Chat, Message, AiIntensity, Country, NewsItem, Persona } from './types';
import { RAW_COUNTRIES, EVENT_KNOWLEDGE_BASE, BREAKING_NEWS_OPTIONS, TRANSLATIONS, G7_MEMBERS, BRICS_MEMBERS, SCO_MEMBERS, NATO_MEMBERS, EU_MEMBERS, AU_MEMBERS, ARAB_LEAGUE_MEMBERS, GCC_MEMBERS, RANDOM_EVENT_TEMPLATES } from './data';
import { generatePublicResponse, generatePrivateResponse, evaluateAndGetRelationshipUpdates, generateInitialGoals, generateSecretDiplomacy } from './ai';
import { playNotificationSound } from './utils';
import { Header, NavColumn, ListViewColumn, ChatWindow, CountryProfileModal, SettingsModal, HostSummitModal, LeakIntelModal } from './components';

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
            privateConsensus: [],
        };
        if (processedCountries[id].persona && 'relationship_matrix' in processedCountries[id].persona) {
            delete processedCountries[id].persona.relationship_matrix;
        }
    }

    const countriesWithGoals = generateInitialGoals(processedCountries, EVENT_KNOWLEDGE_BASE);

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

export const App = () => {
    const [countries, setCountries] = useState<Record<string, Country>>(initialState.countries);
    const [chats, setChats] = useState<Chat[]>(initialState.chats);
    const [activeChatId, setActiveChatId] = useState<string | null>('global');
    const [messages, setMessages] = useState<Message[]>(initialState.messages);
    const [modalCountry, setModalCountry] = useState<Country | null>(null);
    const [activeView, setActiveView] = useState<'chats' | 'directory'>('chats');
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const [isSummitModalOpen, setSummitModalOpen] = useState(false);
    const [isIntelModalOpen, setIntelModalOpen] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [language, setLanguage] = useState<'en' | 'zh'>('zh');
    const [aiIntensity, setAiIntensity] = useState<AiIntensity>('medium');
    const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
    
    const messageIdCounter = useRef(initialState.messages.length + 1);
    const turnCounter = useRef(1);
    const activeChatIdRef = useRef(activeChatId);

    const t = TRANSLATIONS[language];
    const activeChat = chats.find(c => c.id === activeChatId);

    useEffect(() => { activeChatIdRef.current = activeChatId; }, [activeChatId]);
    useEffect(() => { document.body.className = `theme-${theme}`; }, [theme]);

    useEffect(() => {
        if (messages.length <= initialState.messages.length) return;
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.senderId !== 'observer' && lastMessage.chatId !== activeChatIdRef.current) {
            playNotificationSound();
            setUnreadCounts(prev => ({ ...prev, [lastMessage.chatId]: (prev[lastMessage.chatId] || 0) + 1 }));
        }
    }, [messages]);

    const handleRelationshipUpdates = (message: Message, chat: Chat) => {
        const updates = evaluateAndGetRelationshipUpdates(message, chat, countries);
        if (Object.keys(updates).length === 0) return;

        setCountries(prevCountries => {
            const newCountries = JSON.parse(JSON.stringify(prevCountries));
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

    const addMessage = (msg: Message) => {
        const chatContext = chats.find(c => c.id === msg.chatId);
        if (!chatContext) return;

        setMessages(prev => [...prev, msg]);
        handleRelationshipUpdates(msg, chatContext);

        const diplomacy = generateSecretDiplomacy(msg, chatContext, countries, turnCounter.current);
        if (diplomacy.systemMessage) {
            setMessages(prev => [...prev, diplomacy.systemMessage]);
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
        msgs.forEach((res, index) => {
            setTimeout(() => addMessage(res), (index + 1) * 100);
        });
    };

    const handleSelectChat = (chatId: string) => {
        setActiveChatId(chatId);
        if (unreadCounts[chatId]) {
            setUnreadCounts(prev => ({ ...prev, [chatId]: 0 }));
        }
    };
    
    const handleSendMessage = (text: string) => {
        if (!activeChat) return;
        turnCounter.current++;
        const newMessage: Message = { id: messageIdCounter.current++, chatId: activeChat.id, senderId: 'observer', text, timestamp: Date.now() };
        addMessage(newMessage);
        
        const messageHistory = [...messages, newMessage];
        if (activeChat.type === 'private') {
            addMessage(generatePrivateResponse(newMessage, activeChat, countries, messageHistory));
        } else if (activeChat.type === 'group' || activeChat.type === 'summit') {
            addMessagesWithDelay(generatePublicResponse(newMessage, activeChat, aiIntensity, countries, messageHistory, turnCounter.current));
        }
    };

    const handlePostNewsEvent = (newsItem: NewsItem) => {
        const globalChat = chats.find(c => c.id === 'global');
        if (!globalChat) return;
        turnCounter.current++;
        const newsMessage: Message = { 
            id: messageIdCounter.current++, 
            chatId: 'global', 
            senderId: 'news_flash', 
            title: newsItem.title, 
            text: newsItem.snippet, 
            timestamp: Date.now(),
            isFabricated: newsItem.isFabricated,
        };
        addMessage(newsMessage);
        
        const messageHistory = [...messages, newsMessage];
        const intensity = newsItem.isFabricated ? 'high' : aiIntensity;
        addMessagesWithDelay(generatePublicResponse(newsMessage, globalChat, intensity, countries, messageHistory, turnCounter.current));
    };

    const handleHostSummit = (theme: string, participants: string[]) => {
        const summitId = `summit_${Date.now()}`;
        const newChat: Chat = {
            id: summitId,
            name: `🏛️ ${theme}`,
            type: 'summit',
            participants: ['observer', ...participants],
        };
        setChats(prev => [newChat, ...prev]);

        const announcement: Message = {
            id: messageIdCounter.current++,
            chatId: summitId,
            senderId: 'system',
            text: `【Summit Announcement】: This summit has officially begun. The topic is '${theme}'.`,
            timestamp: Date.now(),
        };
        addMessage(announcement);
        
        setSummitModalOpen(false);
        handleSelectChat(summitId);
        
        const messageHistory = [announcement];
        addMessagesWithDelay(generatePublicResponse(announcement, newChat, 'high', countries, messageHistory, turnCounter.current));
    };

    const handleLeakIntel = (intel: string) => {
        if (!activeChat) return;
        turnCounter.current++;
        const intelMessage: Message = {
            id: messageIdCounter.current++,
            chatId: activeChat.id,
            senderId: 'intel_leak',
            text: intel,
            timestamp: Date.now(),
        };
        addMessage(intelMessage);
        setIntelModalOpen(false);
        
        const messageHistory = [...messages, intelMessage];
        addMessagesWithDelay(generatePublicResponse(intelMessage, activeChat, aiIntensity, countries, messageHistory, turnCounter.current));
    };

    const handleStartPrivateChat = (countryId: string) => {
        const privateChatId = `private_${countryId}`;
        const existingChat = chats.find(c => c.id === privateChatId);
        if (existingChat) {
            handleSelectChat(existingChat.id);
        } else {
            const country = countries[countryId];
            const newChat: Chat = {
                id: privateChatId,
                name: `${country.avatar} ${country.name}`,
                type: 'private',
                participants: ['observer', countryId],
            };
            setChats(prev => [newChat, ...prev.filter(c => c.type !== 'private'), ...prev.filter(c => c.type === 'private' && c.id !== privateChatId)]);
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

    return (
        <>
            <Header onSettingsClick={() => setSettingsOpen(true)} />
            <NavColumn activeView={activeView} onSelectView={setActiveView} t={t} />
            <ListViewColumn
                activeView={activeView} chats={chats} countries={countries} activeChatId={activeChatId}
                unreadCounts={unreadCounts} onSelectChat={handleSelectChat}
                onSelectCountry={(countryId) => setModalCountry(countries[countryId])}
                onCloseChat={handleClosePrivateChat} onReorderChats={handleReorderChats}
            />
            <ChatWindow
                key={activeChatId} chat={activeChat} countries={countries}
                messages={messages}
                onSendMessage={handleSendMessage} 
                onPostNewsEvent={handlePostNewsEvent}
                onOpenSummitModal={() => setSummitModalOpen(true)} 
                onOpenIntelModal={() => setIntelModalOpen(true)}
            />
            {modalCountry && <CountryProfileModal country={modalCountry} onClose={() => setModalCountry(null)} onStartChat={() => handleStartPrivateChat(modalCountry.id)} t={t} />}
            {isSettingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} theme={theme} onThemeChange={setTheme} language={language} onLanguageChange={setLanguage} intensity={aiIntensity} onIntensityChange={setAiIntensity} t={t} />}
            {isSummitModalOpen && <HostSummitModal countries={countries} onClose={() => setSummitModalOpen(false)} onHost={handleHostSummit} />}
            {isIntelModalOpen && <LeakIntelModal onClose={() => setIntelModalOpen(false)} onLeak={handleLeakIntel} />}
        </>
    );
};