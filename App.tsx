

import React, { useState, useEffect, useRef } from 'react';
import { Chat, Message, AiIntensity, Country } from './types';
import { INITIAL_CHATS, INITIAL_MESSAGES, COUNTRIES, TRANSLATIONS } from './data';
import { generatePublicResponse, generatePrivateResponse } from './ai';
import { playNotificationSound } from './utils';
import { Header, NavColumn, ListViewColumn, ChatWindow, CountryProfileModal, SettingsModal } from './components';

export const App = () => {
    const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
    const [activeChatId, setActiveChatId] = useState<string | null>('global');
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [modalCountry, setModalCountry] = useState<Country | null>(null);
    const [activeView, setActiveView] = useState<'chats' | 'directory'>('chats');
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [language, setLanguage] = useState<'en' | 'zh'>('en');
    const [aiIntensity, setAiIntensity] = useState<AiIntensity>('medium');
    const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
    const messageIdCounter = useRef(INITIAL_MESSAGES.length + 1);

    const t = TRANSLATIONS[language];
    const activeChat = chats.find(c => c.id === activeChatId);

    // --- START OF THE DEFINITIVE FIX ---

    // 1. Create a ref to hold a persistent, mutable reference to the active chat ID.
    const activeChatIdRef = useRef(activeChatId);

    // 2. Use a dedicated useEffect to keep the ref perfectly in sync with the state.
    // This ensures the ref *always* holds the most current value.
    useEffect(() => {
        activeChatIdRef.current = activeChatId;
    }, [activeChatId]);
    
    // 3. The notification useEffect now ONLY depends on `messages`.
    useEffect(() => {
        // Guard against running for the initial batch of messages on load.
        if (messages.length <= INITIAL_MESSAGES.length) return;
    
        const lastMessage = messages[messages.length - 1];
    
        // The critical comparison now uses the ALWAYS CURRENT value from the ref,
        // solving the "stale state" problem.
        if (lastMessage.senderId !== 'observer' && lastMessage.chatId !== activeChatIdRef.current) {
            playNotificationSound();
            setUnreadCounts(prev => ({
                ...prev,
                [lastMessage.chatId]: (prev[lastMessage.chatId] || 0) + 1,
            }));
        }
    }, [messages]); // <-- This hook now correctly and safely depends ONLY on messages.

    // --- END OF THE DEFINITIVE FIX ---


    useEffect(() => {
        document.body.className = `theme-${theme}`;
    }, [theme]);

    const addMessage = (msg: Message) => {
        setMessages(prev => [...prev, msg]);
    };

    const addMessagesWithDelay = (msgs: Message[]) => {
        msgs.forEach(res => {
            setTimeout(() => addMessage(res), res.timestamp - Date.now());
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
        addMessage(newMessage);

        if (activeChat.type === 'private') {
            addMessagesWithDelay([generatePrivateResponse(newMessage, activeChat)]);
        } else if (activeChat.type === 'group') {
            addMessagesWithDelay(generatePublicResponse(newMessage, activeChat, aiIntensity));
        }
    };

    const handleStartPrivateChat = (countryId: string) => {
        const privateChatId = `private_${countryId}`;
        const existingChat = chats.find(c => c.id === privateChatId);

        if (existingChat) {
            handleSelectChat(existingChat.id);
        } else {
            const country = COUNTRIES[countryId];
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
            setActiveChatId(null);
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
                activeChatId={activeChatId}
                unreadCounts={unreadCounts}
                onSelectChat={handleSelectChat}
                onSelectCountry={(countryId) => setModalCountry(COUNTRIES[countryId])}
                onCloseChat={handleClosePrivateChat}
                onReorderChats={handleReorderChats}
            />
            <ChatWindow
                key={activeChatId}
                chat={activeChat}
                messages={activeChat ? messages.filter(m => m.chatId === activeChatId) : []}
                onSendMessage={handleSendMessage}
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
        </>
    );
};
