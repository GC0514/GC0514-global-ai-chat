import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Country, Message, Chat, AiIntensity, NewsItem } from './types';
import { BREAKING_NEWS_OPTIONS } from './data';

// --- CHILD COMPONENTS ---

export const Header = ({ onSettingsClick }) => (
    <header className="app-header frosted-panel">
        <div className="user-avatar">👤</div>
        <button className="settings-button" onClick={onSettingsClick} aria-label="Settings">⚙️</button>
    </header>
);

export const NavColumn = ({ activeView, onSelectView, t }) => (
    <nav className="nav-column frosted-panel">
        <div className={`nav-item ${activeView === 'chats' ? 'active' : ''}`} onClick={() => onSelectView('chats')}>
            <span className="icon">💬</span>
            <span className="label">{t.chats}</span>
        </div>
        <div className={`nav-item ${activeView === 'directory' ? 'active' : ''}`} onClick={() => onSelectView('directory')}>
            <span className="icon">🌐</span>
            <span className="label">{t.directory}</span>
        </div>
    </nav>
);

interface ListViewColumnProps {
    activeView: 'chats' | 'directory';
    chats: Chat[];
    countries: Record<string, Country>;
    activeChatId: string | null;
    unreadCounts: Record<string, number>;
    onSelectChat: (chatId: string) => void;
    onSelectCountry: (countryId: string) => void;
    onCloseChat: (chatId: string) => void;
    onReorderChats: (draggedId: string, targetId: string) => void;
}

export const ListViewColumn: React.FC<ListViewColumnProps> = ({ activeView, chats, countries, activeChatId, unreadCounts, onSelectChat, onSelectCountry, onCloseChat, onReorderChats }) => {
    const directory = Object.values(countries);
    const continents = ['All', 'Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];
    const [continentFilter, setContinentFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const dragItem = useRef<string | null>(null);
    const dragOverItem = useRef<string | null>(null);

    const filteredDirectory = directory.filter(c => 
        (continentFilter === 'All' || c.continent === continentFilter) &&
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredChats = chats.filter(chat => {
        const country = chat.type === 'private' ? countries[chat.participants.find(p => p !== 'observer')] : null;
        const name = country ? country.name : chat.name;
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, id: string) => {
        dragItem.current = id;
        e.dataTransfer.effectAllowed = 'move';
        e.currentTarget.classList.add('dragging');
    };

    const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, id: string) => {
        dragOverItem.current = id;
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLIElement>) => {
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
        e.currentTarget.classList.remove('dragging');
        const allItems = e.currentTarget.parentElement?.querySelectorAll('.drag-over');
        allItems?.forEach(item => item.classList.remove('drag-over'));

        if (dragItem.current && dragOverItem.current) {
            onReorderChats(dragItem.current, dragOverItem.current);
        }
        dragItem.current = null;
        dragOverItem.current = null;
    };


    return (
        <aside className="list-view-column frosted-panel">
            <div className="search-bar-container">
                <input 
                    type="text" 
                    className="search-input"
                    placeholder={activeView === 'chats' ? "Search chats..." : "Search countries..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {activeView === 'chats' ? (
                <ul>
                    {filteredChats.map(chat => {
                        const isPrivate = chat.type === 'private';
                        const country = isPrivate ? countries[chat.participants.find(p => p !== 'observer')] : null;
                        const avatar = isPrivate ? country?.avatar : chat.name.split(' ')[0];
                        const name = isPrivate ? country?.name : chat.name.substring(chat.name.indexOf(' ') + 1);
                        const unreadCount = unreadCounts[chat.id] || 0;

                        return (
                            <li
                                key={chat.id}
                                className={`list-item ${chat.id === activeChatId ? 'active' : ''}`}
                                onClick={() => onSelectChat(chat.id)}
                                draggable
                                onDragStart={(e) => handleDragStart(e, chat.id)}
                                onDragEnter={(e) => handleDragEnter(e, chat.id)}
                                onDragLeave={handleDragLeave}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDragEnd}
                                onDragEnd={handleDragEnd}
                            >
                                <span className="list-item-avatar">{avatar}</span>
                                <div className="list-item-info">
                                    <span className="list-item-name">{name}</span>
                                    {chat.type === 'group' && <span className="participant-count">{chat.participants.length} Members</span>}
                                </div>
                                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                                {isPrivate && (
                                    <button className="close-chat-button" onClick={(e) => { e.stopPropagation(); onCloseChat(chat.id); }}>×</button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <>
                    <div className="continent-filter">
                        <div className="continent-filter-buttons">
                            {continents.map(c => <button key={c} className={`continent-button ${continentFilter === c ? 'active' : ''}`} onClick={() => setContinentFilter(c)}>{c}</button>)}
                        </div>
                        <span className="country-count">{filteredDirectory.length} Countries</span>
                    </div>
                    <ul>
                        {filteredDirectory.map(country => (
                            <li key={country.id} className="list-item" style={{ cursor: 'pointer' }} onClick={() => onSelectCountry(country.id)}>
                                <span className="list-item-avatar">{country.avatar}</span> {country.name}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </aside>
    );
}

export const ChatWindow = ({ chat, countries, messages, onSendMessage, onOpenNewsModal }) => {
    const messageListRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);

    useLayoutEffect(() => {
        const el = messageListRef.current;
        if (!el) return;
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, [messages, chat]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSendMessage(inputValue.trim());
            setInputValue('');
            setEmojiPickerOpen(false);
        }
    };

    const handleEmojiClick = (emoji: string) => {
        setInputValue(prev => prev + emoji);
    }

    if (!chat) return <main className="chat-window placeholder frosted-panel"><div>Select a chat to start messaging</div></main>;

    const EMOJIS = ['😊', '😂', '👍', '❤️', '🙏', '🤔', '🎉', '🔥', '💡', '🤝', '📈', '📉'];

    return (
        <main className="chat-window frosted-panel">
            <header className="chat-header">{chat.name}</header>
            <div className="message-list" ref={messageListRef}>
                {messages.map(msg => <MessageComponent key={msg.id} message={msg} countries={countries} />)}
            </div>
            <div className="message-input-area">
                {isEmojiPickerOpen && (
                    <div className="emoji-picker">
                        {EMOJIS.map(emoji => <span key={emoji} onClick={() => handleEmojiClick(emoji)}>{emoji}</span>)}
                    </div>
                )}
                <div className="input-toolbar">
                    <button className="toolbar-button" onClick={() => setEmojiPickerOpen(o => !o)}>😊</button>
                    {chat.id === 'global' && (
                        <button className="toolbar-button" onClick={onOpenNewsModal} title="Select News Event">⚡️</button>
                    )}
                </div>
                <form className="message-input-form" onSubmit={handleSubmit}>
                    <textarea
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e as any); } }}
                        className="message-input"
                        placeholder="Type your message as an Observer..."
                        aria-label="Message Input"
                        rows={1}
                    />
                    <button className="send-button" type="submit" aria-label="Send Message">Send</button>
                </form>
            </div>
        </main>
    );
};

export const MessageComponent = ({ message, countries }: { message: Message, countries: Record<string, Country> }) => {
    if (message.senderId === 'news_flash') {
        return (
            <div className="message news-flash">
                <div className="news-flash-content">
                    <h4><span className="news-flash-icon">📰</span> {message.title || 'News Flash'}</h4>
                    <p>{message.text}</p>
                </div>
            </div>
        );
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

export const CountryProfileModal = ({ country, onClose, onStartChat, t }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>×</button>
                <div className="modal-avatar">{country.avatar}</div>
                <h3 className="modal-name">{country.name}</h3>
                <p className="modal-description">{country.profile}</p>

                <div className="profile-details">
                    <dl>
                        <dt>{t.language}</dt>
                        <dd>{country.language}</dd>
                        <dt>{t.ethnicGroups}</dt>
                        <dd>{country.ethnic_groups.join(', ')}</dd>
                        <dt>{t.shortTermGoal}</dt>
                        <dd>{country.goals.short_term}</dd>
                        <dt>{t.longTermGoal}</dt>
                        <dd>{country.goals.long_term}</dd>
                        <dt>{t.motto}</dt>
                        <dd>{country.motto}</dd>
                    </dl>
                </div>
                 <p className="modal-description" style={{ marginTop: '1rem' }}>{country.detailedProfile}</p>
                
                <div className="modal-actions">
                     <button className="modal-button secondary" onClick={onClose}>
                        {t.close}
                    </button>
                    <button className="modal-button primary" onClick={onStartChat}>
                        {t.chat}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const SettingsModal = ({ onClose, theme, onThemeChange, language, onLanguageChange, intensity, onIntensityChange, t }) => {
    const intensityLevels: AiIntensity[] = ['simple', 'medium', 'high', 'intense'];

    return (
        <div className="modal-overlay settings-modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-name">{t.settings}</h3>
                <div className="setting-item">
                    <span className="setting-label">{t.theme}</span>
                    <label className="toggle-switch">
                        <input type="checkbox" checked={theme === 'dark'} onChange={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')} />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="setting-item">
                    <span className="setting-label">{t.language}</span>
                    <select value={language} onChange={e => onLanguageChange(e.target.value as 'en' | 'zh')} className="setting-select">
                        <option value="en">English</option>
                        <option value="zh">中文</option>
                    </select>
                </div>
                <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span className="setting-label">{t.scale}</span>
                    <div className="segmented-control">
                        {intensityLevels.map(level => (
                            <button
                                key={level}
                                className={intensity === level ? 'active' : ''}
                                onClick={() => onIntensityChange(level)}
                            >
                                {t.intensity[level]}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="modal-actions" style={{ marginTop: '1rem', justifyContent: 'center' }}>
                    <button className="modal-button secondary" onClick={onClose}>{t.close}</button>
                </div>
            </div>
        </div>
    );
};

export const NewsEventModal = ({ onClose, onPostEvent }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

    useEffect(() => {
        // Simulate fetching news from an API
        const timer = setTimeout(() => {
            setNewsItems(BREAKING_NEWS_OPTIONS);
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handlePost = () => {
        if (selectedNewsId) {
            const selectedNews = newsItems.find(item => item.id === selectedNewsId);
            if (selectedNews) {
                onPostEvent(selectedNews);
            }
        }
    };

    return (
        <div className="modal-overlay news-modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-name">Select a News Event</h3>
                {isLoading ? (
                    <div className="loading-news">
                        <p>Fetching hot topics...</p>
                    </div>
                ) : (
                    <ul className="news-list">
                        {newsItems.map(item => (
                            <li
                                key={item.id}
                                className={`news-item ${selectedNewsId === item.id ? 'selected' : ''}`}
                                onClick={() => setSelectedNewsId(item.id)}
                            >
                                <h4>{item.title}</h4>
                                <p>{item.snippet}</p>
                                <div className="source">Source: {item.source}</div>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="modal-actions" style={{ justifyContent: 'flex-end' }}>
                     <button className="modal-button secondary" onClick={onClose}>Cancel</button>
                    <button 
                        className="modal-button primary" 
                        onClick={handlePost} 
                        disabled={!selectedNewsId || isLoading}
                    >
                        Post Event
                    </button>
                </div>
            </div>
        </div>
    );
};
