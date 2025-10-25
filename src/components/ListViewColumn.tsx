import React, { useState, useRef } from 'react';
import { Country, Chat } from '../types';

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

    const filteredDirectory = directory.filter((c: Country) => 
        (continentFilter === 'All' || c.continent === continentFilter) &&
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredChats = chats.filter(chat => {
        let chatName = chat.name;
        if (chat.type === 'private' && !chat.participants.includes('observer')) {
            const aiParticipants = chat.participants.filter(p => countries[p]);
            if (aiParticipants.length > 1) {
                 chatName = `🤝 ${aiParticipants.map(id => countries[id].name).join(' & ')}`;
            }
        }
        return chatName.toLowerCase().includes(searchTerm.toLowerCase());
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
                        const unreadCount = unreadCounts[chat.id] || 0;
                        const isClosable = chat.type === 'private' || chat.type === 'summit';
                        
                        let avatar = chat.name.split(' ')[0];
                        let name = chat.name.substring(chat.name.indexOf(' ') + 1);

                        if (chat.type === 'private' && !chat.participants.includes('observer')) {
                            const aiParticipants = chat.participants.filter(p => countries[p]);
                            avatar = '🤝';
                            name = aiParticipants.map(id => countries[id]?.name).join(' & ');
                        }

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
                                    {(chat.type === 'group' || chat.type === 'summit') && <span className="participant-count">{chat.participants.length -1} Members</span>}
                                </div>
                                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                                {isClosable && (
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
                        {filteredDirectory.map((country: Country) => (
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
