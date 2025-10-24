import React, { useState, useEffect, useRef } from 'react';
import { Chat, Message, AiIntensity, Country, NewsItem, Persona } from './types';
import { RAW_COUNTRIES, EVENT_KNOWLEDGE_BASE, BREAKING_NEWS_OPTIONS, TRANSLATIONS, G7_MEMBERS, BRICS_MEMBERS, SCO_MEMBERS, NATO_MEMBERS, EU_MEMBERS, AU_MEMBERS, ARAB_LEAGUE_MEMBERS, GCC_MEMBERS } from './data';
import { generatePublicResponse, generatePrivateResponse, evaluateAndGetRelationshipUpdates, generateInitialGoals } from './ai';
import { playNotificationSound } from './utils';
import { Header, NavColumn, ListViewColumn, ChatWindow, CountryProfileModal, SettingsModal, NewsEventModal } from './components';

// This function centralizes all the complex startup logic to avoid circular dependencies.
const initializeAppState = () => {
    // 1. Process Raw Countries to create the base Country objects
    const processedCountries: Record<string, any> = {};
    const countryIds = Object.keys(RAW_COUNTRIES);

    for (const id of countryIds) {
        const raw = RAW_COUNTRIES[id];
        processedCountries[id] = {
            ...raw,
            relationships: {},
            goals: { short_term: 'Assess global situation.', long_term: 'Ensure national prosperity and security.' },
            persona: raw.persona as Persona | undefined, // Cast persona to its proper type
        };
        // Clean up relationship_matrix from the live object after processing
        if (processedCountries[id].persona && 'relationship_matrix' in processedCountries[id].persona) {
            delete processedCountries[id].persona.relationship_matrix;
        }
    }

    // 2. Generate initial goals based on the knowledge base
    const countriesWithGoals = generateInitialGoals(processedCountries, EVENT_KNOWLEDGE_BASE);

    // 3. Populate relationships for each country
    for (const idA of countryIds) {
        const countryA = countriesWithGoals[idA];
        const personaA = RAW_COUNTRIES[idA].persona;

        for (const idB of countryIds) {
            if (idA === idB) continue;

            let strategicAlignment = 0; // Default neutral
            if (personaA?.relationship_matrix) {
                if (personaA.relationship_matrix.allies.includes(idB)) {
                    strategicAlignment = 8;
                } else if (personaA.relationship_matrix.rivals.includes(idB)) {
                    strategicAlignment = -8;
                }
            }
            
            countryA.relationships[idB] = {
                strategicAlignment,
                currentStanding: 0,
            };
        }
    }

    // 4. Create initial chats using the fully processed countries list
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

    // 5. Create initial messages
     const initialMessages: Message[] = [
        { id: 1, chatId: 'global', senderId: 'USA', text: 'Welcome delegates. The United States calls this session of the Global Country Chat to order. We have much to discuss.', timestamp: Date.now() - 1000 * 60 * 5 },
        { id: 2, chatId: 'global', senderId: 'CHN', text: 'China is present and looks forward to a productive discussion based on mutual respect and non-interference.', timestamp: Date.now() - 1000 * 60 * 4 },
        { id: 3, chatId: 'g7', senderId: 'GBR', text: 'G7 members, an urgent matter has been brought to our attention regarding global economic stability.', timestamp: Date.now() - 1000 * 60 * 2 },
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
    const [isNewsModalOpen, setNewsModalOpen] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [language, setLanguage] = useState<'en' | 'zh'>('en');
    const [aiIntensity, setAiIntensity] = useState<AiIntensity>('medium');
    const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
    const messageIdCounter = useRef(initialState.messages.length + 1);

    const t = TRANSLATIONS[language];
    const activeChat = chats.find(c => c.id === activeChatId);
    
    const activeChatIdRef = useRef(activeChatId);
    useEffect(() => {
        activeChatIdRef.current = activeChatId;
    }, [activeChatId]);
    
    useEffect(() => {
        if (messages.length <= initialState.messages.length) return;
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.senderId !== 'observer' && lastMessage.chatId !== activeChatIdRef.current) {
            playNotificationSound();
            setUnreadCounts(prev => ({
                ...prev,
                [lastMessage.chatId]: (prev[lastMessage.chatId] || 0) + 1,
            }));
        }
    }, [messages]);

    useEffect(() => {
        document.body.className = `theme-${theme}`;
    }, [theme]);

    const handleRelationshipUpdates = (message: Message, chat: Chat) => {
        const updates = evaluateAndGetRelationshipUpdates(message, chat, countries);
        if (Object.keys(updates).length === 0) return;

        setCountries(prevCountries => {
            const newCountries = JSON.parse(JSON.stringify(prevCountries));
            for (const countryId in updates) {
                const { targetId, change } = updates[countryId];
                
                if (newCountries[countryId] && newCountries[countryId].relationships[targetId]) {
                    newCountries[countryId].relationships[targetId].currentStanding += change;
                }
                if (newCountries[targetId] && newCountries[targetId].relationships[countryId]) {
                    newCountries[targetId].relationships[countryId].currentStanding += change;
                }
            }
            return newCountries;
        });
    };

    const addMessage = (msg: Message, chatContext: Chat) => {
        setMessages(prev => [...prev, msg]);
        handleRelationshipUpdates(msg, chatContext);
    };
    
    const addMessagesWithDelay = (msgs: Message[], chatContext: Chat) => {
        msgs.forEach((res, index) => {
            setTimeout(() => {
                addMessage(res, chatContext);
            }, (index + 1) * 100);
        });
    };

    const handleSelectChat = (chatId: string) => {
        setActiveChatId(chatId);
        if (unreadCounts[chatId]) {
            setUnreadCounts(prev => ({ ...prev, [chatId]: 0 }));
        }
    };
    
    const handleSendMessage = (text: string) => {
        if (!activeChatId || !activeChat) return;

        const newMessage: Message = {
            id: messageIdCounter.current++, chatId: activeChatId, senderId: 'observer', text, timestamp: Date.now(),
        };
        addMessage(newMessage, activeChat);
        
        const messageHistory = messages.filter(m => m.chatId === activeChatId);

        if (activeChat.type === 'private') {
            const response = generatePrivateResponse(newMessage, activeChat, countries, messageHistory);
            addMessage(response, activeChat);
        } else if (activeChat.type === 'group') {
            const responses = generatePublicResponse(newMessage, activeChat, aiIntensity, countries, messageHistory);
            addMessagesWithDelay(responses, activeChat);
        }
    };

    const handlePostNewsEvent = (newsItem: NewsItem) => {
        const globalChat = chats.find(c => c.id === 'global');
        if (!globalChat) return;

        const newsMessage: Message = {
            id: messageIdCounter.current++,
            chatId: 'global',
            senderId: 'news_flash',
            title: newsItem.title,
            text: newsItem.snippet,
            timestamp: Date.now(),
        };
        addMessage(newsMessage, globalChat);
        setNewsModalOpen(false);
        
        const messageHistory = messages.filter(m => m.chatId === 'global');

        const responses = generatePublicResponse(newsMessage, globalChat, aiIntensity, countries, messageHistory);
        addMessagesWithDelay(responses, globalChat);
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
            setChats(prev => [newChat, ...prev.filter(c => c.type === 'group'), ...prev.filter(c => c.type === 'private')]);
            handleSelectChat(newChat.id);
        }
        setModalCountry(null);
        setActiveView('chats');
    };

    const handleClosePrivateChat = (chatId: string) => {
        setChats(prev => prev.filter(c => c.id !== chatId));
        if (activeChatId === chatId) {
            setActiveChatId('global');
        }
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
                activeView={activeView}
                chats={chats}
                countries={countries}
                activeChatId={activeChatId}
                unreadCounts={unreadCounts}
                onSelectChat={handleSelectChat}
                onSelectCountry={(countryId) => setModalCountry(countries[countryId])}
                onCloseChat={handleClosePrivateChat}
                onReorderChats={handleReorderChats}
            />
            <ChatWindow
                key={activeChatId}
                chat={activeChat}
                countries={countries}
                messages={activeChat ? messages.filter(m => m.chatId === activeChatId) : []}
                onSendMessage={handleSendMessage}
                onOpenNewsModal={() => setNewsModalOpen(true)}
            />
            {modalCountry && (
                <CountryProfileModal
                    country={modalCountry}
                    onClose={() => setModalCountry(null)}
                    onStartChat={() => handleStartPrivateChat(modalCountry.id)}
                    t={t}
                />
            )}
            {isSettingsOpen && (
                <SettingsModal
                    onClose={() => setSettingsOpen(false)}
                    theme={theme}
                    onThemeChange={setTheme}
                    language={language}
                    onLanguageChange={setLanguage}
                    intensity={aiIntensity}
                    onIntensityChange={setAiIntensity}
                    t={t}
                />
            )}
            {isNewsModalOpen && (
                <NewsEventModal
                    onClose={() => setNewsModalOpen(false)}
                    onPostEvent={handlePostNewsEvent}
                />
            )}
        </>
    );
};
