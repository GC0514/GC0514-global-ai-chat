

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Country, Message, Chat, AiIntensity, NewsItem } from './types';
import { BREAKING_NEWS_OPTIONS, RANDOM_EVENT_TEMPLATES } from './data';

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

const generateFakeNewsOptions = (countries: Country[], count = 3): NewsItem[] => {
    const options: NewsItem[] = [];
    for (let i = 0; i < count; i++) {
        const template = RANDOM_EVENT_TEMPLATES[Math.floor(Math.random() * RANDOM_EVENT_TEMPLATES.length)];
        const involvedCountries = [...countries].sort(() => 0.5 - Math.random()).slice(0, 2);
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

const NewsPicker = ({ type, countries, onSelect, onClose }) => {
    const pickerRef = useRef(null);
    const [newsOptions, setNewsOptions] = useState<NewsItem[]>([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
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
            setNewsOptions(generateFakeNewsOptions(countries));
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

export const ChatWindow = ({ chat, countries, messages: allMessages, onSendMessage, onPostNewsEvent, onOpenSummitModal, onOpenIntelModal }) => {
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
                        <div key={flash.id} className="news-ticker-item" title={flash.text}>
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
                        countries={Object.values(countries)}
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
                    {chat.id === 'global' && (
                        <>
                            <button className="toolbar-button" onClick={() => setNewsPickerState({ isOpen: true, type: 'real' })} title="Post Real News Event">📰</button>
                            <button className="toolbar-button" onClick={() => setNewsPickerState({ isOpen: true, type: 'fake' })} title="Post Fabricated News Event">💣</button>
                        </>
                    )}
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

export const SettingsModal = ({ onClose, theme, onThemeChange, language, onLanguageChange, intensity, onIntensityChange, t }) => (
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