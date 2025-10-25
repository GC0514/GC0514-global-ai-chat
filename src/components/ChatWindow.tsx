import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Country, Message, Chat, NewsItem } from '../types';
import { BREAKING_NEWS_OPTIONS, RANDOM_EVENT_TEMPLATES } from '../../data';

// --- SUB-COMPONENTS for CHAT WINDOW ---

const MessageComponent: React.FC<{ message: Message; countries: Record<string, Country> }> = ({ message, countries }) => {
    if (message.senderId === 'news_flash') {
        return (
            <div className={`message news-flash ${message.isFabricated ? 'fabricated' : ''}`}>
                <div className="news-flash-content">
                     <h4><span className="news-flash-icon">📰</span> {message.title || 'News Flash'} {message.isFabricated && <small>(Simulated)</small>}</h4>
                    <p>{message.text}</p>
                </div>
            </div>
        );
    }
    
    if (message.senderId === 'system') {
        return <div className="message system-message"><em>{message.text}</em></div>
    }

    if (message.senderId === 'intel_leak') {
        return (
            <div className="message intel-leak">
                 <div className="message-avatar">🤫</div>
                 <div className="message-content">
                    <div className="message-sender">Unknown Source</div>
                    <div className="message-bubble">{message.text}</div>
                 </div>
            </div>
        )
    }

    const sender = message.senderId === 'observer' ? { name: 'Observer', avatar: '👤' } : countries[message.senderId];
    if (!sender) return null;

    return (
        <div className={`message ${message.senderId === 'observer' ? 'observer' : ''}`}>
            <div className="message-avatar">{sender.avatar}</div>
            <div className="message-content">
                <div className="message-sender">{sender.name}</div>
                <div className="message-bubble">{message.text}</div>
            </div>
        </div>
    );
};


const SpecialActionsMenu: React.FC<{ onOpenSummitModal: () => void; onOpenIntelModal: () => void; onClose: () => void; }> = ({ onOpenSummitModal, onOpenIntelModal, onClose }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div ref={menuRef} style={{ position: 'absolute', bottom: '120px', right: '2rem', background: 'var(--background-panel-opaque)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-main)', zIndex: 100, padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button className="modal-button secondary" onClick={() => { onOpenSummitModal(); onClose(); }}>🏛️ Host Summit</button>
            <button className="modal-button secondary" onClick={() => { onOpenIntelModal(); onClose(); }}>🤫 Leak Intel</button>
        </div>
    );
};

const generateFakeNewsOptions = (countries: Country[], count = 3): NewsItem[] => {
    const options: NewsItem[] = [];
    for (let i = 0; i < count; i++) {
        const template = RANDOM_EVENT_TEMPLATES[Math.floor(Math.random() * RANDOM_EVENT_TEMPLATES.length)];
        const involvedCountries = [...Object.values(countries)].sort(() => 0.5 - Math.random()).slice(0, 2);
        const region = involvedCountries[0].continent;

        let title = template.title.replace('[COUNTRY_A]', involvedCountries[0].name).replace('[COUNTRY_B]', involvedCountries[1].name).replace('[REGION]', region);
        let snippet = template.snippet.replace('[COUNTRY_A]', involvedCountries[0].name).replace('[COUNTRY_B]', involvedCountries[1].name).replace('[REGION]', region);

        options.push({
            id: `fake_${Date.now()}_${i}`,
            title,
            snippet,
            source: template.source,
            isFabricated: true,
        });
    }
    return options;
};

const NewsPicker: React.FC<{ type: 'real' | 'fake'; countries: Record<string, Country>; onSelect: (item: NewsItem) => void; onClose: () => void; }> = ({ type, countries, onSelect, onClose }) => {
    const pickerRef = useRef<HTMLDivElement>(null);
    const [newsOptions, setNewsOptions] = useState<NewsItem[]>([]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    useEffect(() => {
        if (type === 'real') {
            setNewsOptions(BREAKING_NEWS_OPTIONS);
        } else {
            setNewsOptions(generateFakeNewsOptions(Object.values(countries)));
        }
    }, [type, countries]);

    const today = new Date().toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="news-picker" ref={pickerRef}>
            <div className="news-picker-header">{today}</div>
            <ul className="news-picker-list">
                {newsOptions.map(item => (
                    <li key={item.id} className={`news-picker-item ${item.isFabricated ? 'fabricated' : ''}`} onClick={() => onSelect(item)}>
                        <h4>{item.isFabricated && '💣 '}{item.title}</h4>
                        <p>{item.snippet}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};


// --- MAIN CHAT WINDOW COMPONENT ---

interface ChatWindowProps {
    chat: Chat | undefined;
    countries: Record<string, Country>;
    messages: Message[];
    onSendMessage: (text: string) => void;
    onPostNewsEvent: (newsItem: NewsItem) => void;
    onOpenSummitModal: () => void;
    onOpenIntelModal: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chat, countries, messages: allMessages, onSendMessage, onPostNewsEvent, onOpenSummitModal, onOpenIntelModal }) => {
    const messageListRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [isActionsMenuOpen, setActionsMenuOpen] = useState(false);
    const [newsPickerState, setNewsPickerState] = useState<{ isOpen: boolean; type: 'real' | 'fake' }>({ isOpen: false, type: 'real' });
    
    const newsFlashes = allMessages.filter(m => m.senderId === 'news_flash').sort((a, b) => b.timestamp - a.timestamp);
    const currentChatMessages = chat ? allMessages.filter(m => m.chatId === chat.id) : [];

    useLayoutEffect(() => {
        const el = messageListRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'auto' });
    }, [currentChatMessages, chat]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSendMessage(inputValue.trim());
            setInputValue('');
            setEmojiPickerOpen(false);
        }
    };

    if (!chat) return <main className="chat-window placeholder frosted-panel"><div>Select a chat to start messaging</div></main>;

    const EMOJIS = ['😊', '😂', '👍', '❤️', '🙏', '🤔', '🎉', '🔥', '💡', '🤝', '📈', '📉'];

    return (
        <main className="chat-window frosted-panel">
            <header className="chat-header">{chat.name}</header>
            {newsFlashes.length > 0 && (
                <div className="news-ticker-container">
                    {newsFlashes.map(flash => (
                        <div key={flash.id} className="news-ticker-item" title={flash.text ?? undefined}>
                            <span className="icon">{flash.isFabricated ? '💣' : '📰'}</span>
                            <span className="time">{new Date(flash.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            <span className="title">{flash.title}</span>
                        </div>
                    ))}
                </div>
            )}
            <div className="message-list" ref={messageListRef}>
                {currentChatMessages.map(msg => <MessageComponent key={msg.id} message={msg} countries={countries} />)}
            </div>
            <div className="message-input-area">
                {isEmojiPickerOpen && <div className="emoji-picker">{EMOJIS.map(emoji => <span key={emoji} onClick={() => setInputValue(p => p + emoji)}>{emoji}</span>)}</div>}
                {isActionsMenuOpen && <SpecialActionsMenu onOpenSummitModal={onOpenSummitModal} onOpenIntelModal={onOpenIntelModal} onClose={() => setActionsMenuOpen(false)} />}
                {newsPickerState.isOpen && (
                    <NewsPicker
                        type={newsPickerState.type}
                        countries={countries}
                        onSelect={(newsItem) => {
                            onPostNewsEvent(newsItem);
                            setNewsPickerState({ isOpen: false, type: 'real' });
                        }}
                        onClose={() => setNewsPickerState({ isOpen: false, type: 'real' })}
                    />
                )}
                
                <div className="input-toolbar">
                    <button className="toolbar-button" onClick={() => setEmojiPickerOpen(o => !o)}>😊</button>
                    <button className="toolbar-button" onClick={() => setActionsMenuOpen(o => !o)} title="Special Actions">⚡️</button>
                    <button className="toolbar-button" onClick={() => setNewsPickerState({ isOpen: true, type: 'real' })} title="Post Real News Event">📰</button>
                    <button className="toolbar-button" onClick={() => setNewsPickerState({ isOpen: true, type: 'fake' })} title="Post Fabricated News Event">💣</button>
                </div>
                <form className="message-input-form" onSubmit={handleSubmit}>
                    <textarea value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e as any); } }} className="message-input" placeholder="Type your message as an Observer..." rows={1} />
                    <button className="send-button" type="submit">Send</button>
                </form>
            </div>
        </main>
    );
};