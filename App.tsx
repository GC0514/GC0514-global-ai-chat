import React, { useState, useEffect, useRef } from 'react';
import { Chat, Message, AiIntensity, Country, NewsItem } from './types';
import { INITIAL_CHATS, INITIAL_MESSAGES, INITIAL_COUNTRIES, TRANSLATIONS } from './data';
import { generatePublicResponse, generatePrivateResponse, evaluateAndGetRelationshipUpdates } from './ai';
import { playNotificationSound } from './utils';
import { Header, NavColumn, ListViewColumn, ChatWindow, CountryProfileModal, SettingsModal, NewsEventModal } from './components';

export const App = () => {
    const [countries, setCountries] = useState<Record<string, Country>>(INITIAL_COUNTRIES);
    const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
    const [activeChatId, setActiveChatId] = useState<string | null>('global');
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [modalCountry, setModalCountry] = useState<Country | null>(null);
    const [activeView, setActiveView] = useState<'chats' | 'directory'>('chats');
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const [isNewsModalOpen, setNewsModalOpen] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [language, setLanguage] = useState<'en' | 'zh'>('en');
    const [aiIntensity, setAiIntensity] = useState<AiIntensity>('medium');
    const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
    const messageIdCounter = useRef(INITIAL_MESSAGES.length + 1);

    const t = TRANSLATIONS[language];
    const activeChat = chats.find(c => c.id === activeChatId);
    
    const activeChatIdRef = useRef(activeChatId);
    useEffect(() => {
        activeChatIdRef.current = activeChatId;
    }, [activeChatId]);
    
    useEffect(() => {
        if (messages.length <= INITIAL_MESSAGES.length) return;
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
                
                // Update relationship from countryId to targetId
                if (newCountries[countryId] && newCountries[countryId].relationships[targetId]) {
                    newCountries[countryId].relationships[targetId].currentStanding += change;
                }
                // Update reciprocal relationship from targetId to countryId
                if (newCountries[targetId] && newCountries[targetId].relationships[countryId]) {
                    newCountries[targetId].relationships[countryId].currentStanding += change;
                }
            }
            return newCountries;
        });
    };

    const addMessage = (msg: Message, chatContext: Chat) => {
        setMessages(prev => [...prev, msg]);
        // Update relationships based on the new message
        handleRelationshipUpdates(msg, chatContext);
    };
    
    const addMessagesWithDelay = (msgs: Message[], chatContext: Chat) => {
        msgs.forEach((res, index) => {
            setTimeout(() => {
                addMessage(res, chatContext);
            }, (index + 1) * 100); // Use a fixed short delay instead of timestamp
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

        if (activeChat.type === 'private') {
            const response = generatePrivateResponse(newMessage, activeChat, countries);
            addMessage(response, activeChat);
        } else if (activeChat.type === 'group') {
            const responses = generatePublicResponse(newMessage, activeChat, aiIntensity, countries);
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

        // Also trigger public responses to the news
        const responses = generatePublicResponse(newsMessage, globalChat, aiIntensity, countries);
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
