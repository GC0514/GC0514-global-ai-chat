import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Country, Message, Chat, NewsItem } from '../types';
import { BREAKING_NEWS_OPTIONS, RANDOM_EVENT_TEMPLATES } from '../../data';

// --- SUB-COMPONENTS for CHAT WINDOW ---

const MessageComponent: React.FC<{ message: Message; countries: Record<string, Country>, onQuote: (message: Message) => void, onAvatarClick: (countryId: string) => void }> = ({ message, countries, onQuote, onAvatarClick }) => {
    
    const sender = message.senderId === 'observer' ? { name: 'Observer', avatar: '👤' } : countries[message.senderId];
    
    const renderQuotedText = (text: string) => {
        const parts = text.split(/(> ".*?")/gs);
        return parts.map((part, index) => {
            if (part.startsWith('> "')) {
                return <blockquote key={index}>{part.substring(3, part.length - 1)}</blockquote>;
            }
            return part;
        });
    };

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
                 <div className="message-hover-area">
                    <div className="message-avatar">🤫</div>
                     <div className="message-content">
                        <div className="message-sender">Unknown Source</div>
                        <div className="message-bubble">{message.text}</div>
                     </div>
                    <button className="quote-button" title="Quote" onClick={() => onQuote(message)}>↩️</button>
                 </div>
            </div>
        )
    }

    if (!sender) return null;

    return (
        <div className={`message ${message.senderId === 'observer' ? 'observer' : ''}`}>
             <div className="message-hover-area">
                <div className="message-avatar" onClick={() => onAvatarClick(message.senderId as string)} title={`View profile: ${sender.name}`}>{sender.avatar}</div>
                <div className="message-content">
                    <div className="message-sender">{sender.name}</div>
                    <div className="message-bubble">{renderQuotedText(message.text)}</div>
                </div>
                <button className="quote-button" title="Quote" onClick={() => onQuote(message)}>↩️</button>
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
        <div ref={menuRef} className="popup-panel special-actions-menu">
            <button className="modal-button secondary" onClick={() => { onOpenSummitModal(); onClose(); }}>🏛️ Host Summit</button>
            <button className="modal-button secondary" onClick={() => { onOpenIntelModal(); onClose(); }}>🤫 Leak Intel</button>
        </div>
    );
};

const SimulationControlPanel: React.FC<{ isPaused: boolean; onTogglePause: () => void; onStopSimulation: () => void; onClose: () => void; }> = ({ isPaused, onTogglePause, onStopSimulation, onClose }) => {
    const panelRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) onClose();
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div className="popup-panel sim-control-panel" ref={panelRef}>
            <button onClick={onTogglePause}>
                {isPaused ? '▶️ Resume AI Actions' : '⏸️ Pause AI Actions'}
            </button>
            <button onClick={() => { onStopSimulation(); onClose(); }}>
                ⏹️ Stop Current Responses
            </button>
        </div>
    );
};

const EmojiPicker: React.FC<{ onSelect: (emoji: string) => void, onClose: () => void }> = ({ onSelect, onClose }) => {
    const pickerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) onClose();
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const EMOJIS = ['😊', '😂', '👍', '❤️', '🙏', '🤔', '🎉', '🔥', '💡', '🤝', '📈', '📉'];
    return (
        <div ref={pickerRef} className="popup-panel emoji-picker">
            {EMOJIS.map(emoji => <span key={emoji} onClick={() => onSelect(emoji)}>{emoji}</span>)}
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
        <div className="popup-panel align-left news-picker" ref={pickerRef}>
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
    simulationSpeed: number;
    onSimulationSpeedChange: (speed: number) => void;
    isPaused: boolean;
    onTogglePause: () => void;
    onStopSimulation: () => void;
    onAvatarClick: (countryId: string) => void;
    closedNewsItems: Set<number>;
    onCloseNewsItem: (newsId: number) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chat, countries, messages: allMessages, onSendMessage, onPostNewsEvent, onOpenSummitModal, onOpenIntelModal, simulationSpeed, onSimulationSpeedChange, isPaused, onTogglePause, onStopSimulation, onAvatarClick, closedNewsItems, onCloseNewsItem }) => {
    const messageListRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [activePopup, setActivePopup] = useState<string | null>(null);

    const handlePopupToggle = (popupName: string) => {
        setActivePopup(prev => (prev === popupName ? null : popupName));
    };
    
    const newsFlashes = allMessages.filter(m => m.senderId === 'news_flash' && !closedNewsItems.has(m.id)).sort((a, b) => b.timestamp - a.timestamp);
    const currentChatMessages = chat ? allMessages.filter(m => m.chatId === chat.id) : [];

    useLayoutEffect(() => {
        const el = messageListRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'auto' });
    }, [currentChatMessages, chat]);

    useEffect(() => {
        // Close any open popups when the chat changes
        setActivePopup(null);
    }, [chat]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSendMessage(inputValue.trim());
            setInputValue('');
            setActivePopup(null);
        }
    };

    const handleQuote = (messageToQuote: Message) => {
        if (!inputRef.current) return;

        const quoteText = `> "${messageToQuote.text.split('\n').join('\n> ')}"`;
        
        // Append the quote to the end for a better user experience
        const newText = `${inputValue}${inputValue ? '\n' : ''}${quoteText}\n`;
        
        setInputValue(newText);

        // Focus and move cursor to the end
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
                inputRef.current.scrollTop = inputRef.current.scrollHeight;
            }
        }, 0);
    };

    if (!chat) return <main className="chat-window placeholder frosted-panel"><div>Select a chat to start messaging</div></main>;

    return (
        <main className="chat-window frosted-panel">
            <header className="chat-header">{chat.name}</header>
            {newsFlashes.length > 0 && (
                <div className="news-ticker-wrapper">
                    <div className="news-ticker-container">
                        {newsFlashes.map(flash => (
                            <div key={flash.id} className="news-ticker-item" title={flash.text ?? undefined}>
                                <span className="icon">{flash.isFabricated ? '💣' : '📰'}</span>
                                <span className="time">{new Date(flash.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                <span className="title">{flash.title}</span>
                                <button className="news-item-close-btn" onClick={() => onCloseNewsItem(flash.id)}>×</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="message-list" ref={messageListRef}>
                {currentChatMessages.map(msg => <MessageComponent key={msg.id} message={msg} countries={countries} onQuote={handleQuote} onAvatarClick={onAvatarClick} />)}
            </div>
            <div className="message-input-area">
                <div className="input-toolbar">
                    <div className="toolbar-button-wrapper">
                         <button className="toolbar-button" onClick={() => handlePopupToggle('emoji')} title="Emoji">😊</button>
                         {activePopup === 'emoji' && <EmojiPicker onSelect={(emoji) => setInputValue(p => p + emoji)} onClose={() => setActivePopup(null)} />}
                    </div>
                     <div className="toolbar-button-wrapper">
                        <button className="toolbar-button" onClick={() => handlePopupToggle('actions')} title="Special Actions">⚡️</button>
                         {activePopup === 'actions' && <SpecialActionsMenu onOpenSummitModal={onOpenSummitModal} onOpenIntelModal={onOpenIntelModal} onClose={() => setActivePopup(null)} />}
                    </div>
                    <div className="toolbar-button-wrapper">
                        <button className="toolbar-button" onClick={() => handlePopupToggle('news-real')} title="Post Real News Event">📰</button>
                        {activePopup === 'news-real' &&
                            <NewsPicker
                                type='real'
                                countries={countries}
                                onSelect={(newsItem) => {
                                    onPostNewsEvent(newsItem);
                                    setActivePopup(null);
                                }}
                                onClose={() => setActivePopup(null)}
                            />
                        }
                    </div>
                     <div className="toolbar-button-wrapper">
                        <button className="toolbar-button" onClick={() => handlePopupToggle('news-fake')} title="Post Fabricated News Event">💣</button>
                        {activePopup === 'news-fake' &&
                             <NewsPicker
                                type='fake'
                                countries={countries}
                                onSelect={(newsItem) => {
                                    onPostNewsEvent(newsItem);
                                    setActivePopup(null);
                                }}
                                onClose={() => setActivePopup(null)}
                            />
                        }
                    </div>
                    
                    <div className="simulation-controls">
                        <div className="simulation-speed-control">
                            <label htmlFor="speed">速度</label>
                            <input type="range" id="speed" min="1" max="5" value={simulationSpeed} onChange={e => onSimulationSpeedChange(Number(e.target.value))} />
                        </div>
                        <div className="toolbar-button-wrapper">
                            <button className="toolbar-button" onClick={() => handlePopupToggle('sim-controls')} title="Simulation Controls">⏯️</button>
                            {activePopup === 'sim-controls' && <SimulationControlPanel isPaused={isPaused} onTogglePause={onTogglePause} onStopSimulation={onStopSimulation} onClose={() => setActivePopup(null)} />}
                        </div>
                    </div>
                </div>
                <form className="message-input-form" onSubmit={handleSubmit}>
                    <textarea ref={inputRef} value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e as any); } }} className="message-input" placeholder="Type your message as an Observer..." rows={Math.max(1, inputValue.split('\n').length)} />
                    <button className="send-button" type="submit">Send</button>
                </form>
            </div>
        </main>
    );
};