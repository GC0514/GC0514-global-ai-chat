
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
        <div className={`nav-item ${activeView === 'worldStatus' ? 'active' : ''}`} onClick={() => onSelectView('worldStatus')}>
            <span className="icon">🌍</span>
            <span className="label">{t.worldStatus}</span>
        </div>
    </nav>
);

// ... (ListViewColumn remains the same)
// FIX: Added props interface for ListViewColumn to resolve typing errors.
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


const SpecialActionsMenu = ({ onOpenSummitModal, onOpenIntelModal, onClose }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
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

export const ChatWindow = ({ chat, countries, messages, onSendMessage, onOpenNewsModal, onOpenSummitModal, onOpenIntelModal }) => {
    const messageListRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [isActionsMenuOpen, setActionsMenuOpen] = useState(false);

    useLayoutEffect(() => {
        const el = messageListRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, [messages, chat]);

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
            <div className="message-list" ref={messageListRef}>
                {messages.map(msg => <MessageComponent key={msg.id} message={msg} countries={countries} />)}
            </div>
            <div className="message-input-area">
                {isEmojiPickerOpen && <div className="emoji-picker">{EMOJIS.map(emoji => <span key={emoji} onClick={() => setInputValue(p => p + emoji)}>{emoji}</span>)}</div>}
                {isActionsMenuOpen && <SpecialActionsMenu onOpenSummitModal={onOpenSummitModal} onOpenIntelModal={onOpenIntelModal} onClose={() => setActionsMenuOpen(false)} />}
                
                <div className="input-toolbar">
                    <button className="toolbar-button" onClick={() => setEmojiPickerOpen(o => !o)}>😊</button>
                    <button className="toolbar-button" onClick={() => setActionsMenuOpen(o => !o)} title="Special Actions">⚡️</button>
                    {chat.id === 'global' && <button className="toolbar-button" onClick={onOpenNewsModal} title="Post Global News">📰</button>}
                </div>
                <form className="message-input-form" onSubmit={handleSubmit}>
                    <textarea value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e as any); } }} className="message-input" placeholder="Type your message as an Observer..." rows={1} />
                    <button className="send-button" type="submit">Send</button>
                </form>
            </div>
        </main>
    );
};

export const MessageComponent = ({ message, countries }: { message: Message, countries: Record<string, Country> }) => {
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

export const CountryProfileModal = ({ country, onClose, onStartChat, t }) => (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={onClose}>×</button>
            <div className="modal-avatar">{country.avatar}</div>
            <h3 className="modal-name">{country.name}</h3>
            <p className="modal-description">{country.profile}</p>
            <div className="profile-details">
                <dl>
                    <dt>{t.language}</dt><dd>{country.language}</dd>
                    <dt>{t.ethnicGroups}</dt><dd>{country.ethnic_groups.join(', ')}</dd>
                    <dt>{t.shortTermGoal}</dt><dd>{country.goals.short_term}</dd>
                    <dt>{t.longTermGoal}</dt><dd>{country.goals.long_term}</dd>
                    <dt>{t.motto}</dt><dd>{country.motto}</dd>
                </dl>
            </div>
            <p className="modal-description" style={{ marginTop: '1rem' }}>{country.detailedProfile}</p>
            <div className="modal-actions">
                <button className="modal-button secondary" onClick={onClose}>{t.close}</button>
                <button className="modal-button primary" onClick={onStartChat}>{t.chat}</button>
            </div>
        </div>
    </div>
);

export const SettingsModal = ({ onClose, theme, onThemeChange, language, onLanguageChange, intensity, onIntensityChange, isDynamicEventsEnabled, onDynamicEventsToggle, t }) => (
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
             <div className="setting-item">
                <span className="setting-label">{t.dynamicEvents}</span>
                <label className="toggle-switch">
                    <input type="checkbox" checked={isDynamicEventsEnabled} onChange={() => onDynamicEventsToggle(!isDynamicEventsEnabled)} />
                    <span className="slider"></span>
                </label>
            </div>
            <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span className="setting-label">{t.scale}</span>
                <div className="segmented-control">
                    {['simple', 'medium', 'high', 'intense'].map((level: AiIntensity) => (
                        <button key={level} className={intensity === level ? 'active' : ''} onClick={() => onIntensityChange(level)}>
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

export const NewsEventModal = ({ onClose, onPostEvent }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setNewsItems(BREAKING_NEWS_OPTIONS); setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handlePost = () => {
        if (selectedNewsId) {
            const selectedNews = newsItems.find(item => item.id === selectedNewsId);
            if (selectedNews) onPostEvent(selectedNews);
        }
    };

    return (
        <div className="modal-overlay news-modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-name">Select a News Event</h3>
                {isLoading ? <div className="loading-news"><p>Fetching hot topics...</p></div> : (
                    <ul className="news-list">
                        {newsItems.map(item => (
                            <li key={item.id} className={`news-item ${selectedNewsId === item.id ? 'selected' : ''}`} onClick={() => setSelectedNewsId(item.id)}>
                                <h4>{item.title}</h4>
                                <p>{item.snippet}</p>
                                <div className="source">Source: {item.source}</div>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="modal-actions" style={{ justifyContent: 'flex-end' }}>
                     <button className="modal-button secondary" onClick={onClose}>Cancel</button>
                    <button className="modal-button primary" onClick={handlePost} disabled={!selectedNewsId || isLoading}>Post Event</button>
                </div>
            </div>
        </div>
    );
};

// FIX: Added props interface for WorldStatusDashboard to resolve typing errors.
interface WorldStatusDashboardProps {
    countries: Record<string, Country>;
    onSelectCountry: (id: string) => void;
}
export const WorldStatusDashboard: React.FC<WorldStatusDashboardProps> = ({ countries, onSelectCountry }) => {
    // A simplified representation. In a real app, you'd use a proper mapping library.
    const countryPositions = { USA: { x: 15, y: 30 }, CHN: { x: 70, y: 35 }, RUS: { x: 55, y: 20 }, GBR: { x: 45, y: 25 }, IND: { x: 65, y: 45 }, BRA: { x: 30, y: 65 }, ZAF: { x: 50, y: 80 }, AUS: { x: 85, y: 75 } };
    const tier1Countries = Object.values(countries).filter(c => c.tier === 1);

    const getRelationshipLines = () => {
        const lines = [];
        for (let i = 0; i < tier1Countries.length; i++) {
            for (let j = i + 1; j < tier1Countries.length; j++) {
                const c1 = tier1Countries[i];
                const c2 = tier1Countries[j];
                const pos1 = countryPositions[c1.id];
                const pos2 = countryPositions[c2.id];
                
                if (pos1 && pos2) {
                    const relation = c1.relationships[c2.id];
                    const combinedScore = (relation?.strategicAlignment || 0) + (relation?.currentStanding || 0);
                    let stroke = 'var(--text-secondary)';
                    if (combinedScore > 3) stroke = 'var(--accent-secondary)';
                    if (combinedScore < -3) stroke = 'var(--notification-background)';
                    const strokeWidth = 1 + Math.abs(combinedScore) / 5;
                    
                    lines.push(<line key={`${c1.id}-${c2.id}`} x1={`${pos1.x}%`} y1={`${pos1.y}%`} x2={`${pos2.x}%`} y2={`${pos2.y}%`} stroke={stroke} strokeWidth={strokeWidth} />);
                }
            }
        }
        return lines;
    };
    
    return (
        <main className="chat-window frosted-panel" style={{ gridColumn: '2 / 4', padding: '1rem' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>World Status Dashboard (Tier 1 Powers)</h3>
            <svg width="100%" height="90%" viewBox="0 0 100 100" style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500"><path d="M500 250 L... (path for a simple world map)" fill="%232c3e50"/></svg>')`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                {getRelationshipLines()}
                {tier1Countries.map(c => {
                    const pos = countryPositions[c.id];
                    return pos ? (
                        <g key={c.id} transform={`translate(${pos.x}, ${pos.y})`} onClick={() => onSelectCountry(c.id)} style={{ cursor: 'pointer' }}>
                            <circle r="2" fill="var(--accent-primary)" />
                            <text y="-3" textAnchor="middle" fill="var(--text-primary)" fontSize="2">{c.avatar}</text>
                            <title>{c.name}</title>
                        </g>
                    ) : null;
                })}
            </svg>
        </main>
    );
};

// FIX: Added props interface for HostSummitModal to resolve typing errors.
interface HostSummitModalProps {
    countries: Record<string, Country>;
    onClose: () => void;
    onHost: (theme: string, participants: string[]) => void;
}

export const HostSummitModal: React.FC<HostSummitModalProps> = ({ countries, onClose, onHost }) => {
    const [theme, setTheme] = useState('');
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const handleToggle = (id: string) => {
        setSelected(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    };
    
    const handleSubmit = () => {
        if (theme.trim() && selected.size > 1) {
            onHost(theme.trim(), Array.from(selected));
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3 className="modal-name">Host a Summit</h3>
                <input type="text" value={theme} onChange={e => setTheme(e.target.value)} placeholder="Summit Theme..." className="message-input" style={{ width: '100%', margin: '1rem 0' }} />
                <div style={{ maxHeight: '40vh', overflowY: 'auto', textAlign: 'left', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-subtle)', padding: '0.5rem' }}>
                    {Object.values(countries).map(c => (
                        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem' }}>
                            <input type="checkbox" id={`country-${c.id}`} checked={selected.has(c.id)} onChange={() => handleToggle(c.id)} />
                            <label htmlFor={`country-${c.id}`}>{c.avatar} {c.name}</label>
                        </div>
                    ))}
                </div>
                <div className="modal-actions">
                    <button className="modal-button secondary" onClick={onClose}>Cancel</button>
                    <button className="modal-button primary" onClick={handleSubmit} disabled={!theme.trim() || selected.size < 2}>Host</button>
                </div>
            </div>
        </div>
    );
};

export const LeakIntelModal = ({ onClose, onLeak }) => {
    const [intel, setIntel] = useState('');

    const handleSubmit = () => {
        if (intel.trim()) {
            onLeak(intel.trim());
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3 className="modal-name">Leak Intelligence</h3>
                <textarea value={intel} onChange={e => setIntel(e.target.value)} placeholder="Enter controversial intelligence..." className="message-input" style={{ width: '100%', margin: '1rem 0', minHeight: '100px' }} />
                <div className="modal-actions">
                    <button className="modal-button secondary" onClick={onClose}>Cancel</button>
                    <button className="modal-button primary" onClick={handleSubmit} disabled={!intel.trim()}>Leak</button>
                </div>
            </div>
        </div>
    );
};
