import React from 'react';

interface NavColumnProps {
    activeView: 'chats' | 'directory';
    onSelectView: (view: 'chats' | 'directory') => void;
    t: Record<string, any>;
}

export const NavColumn: React.FC<NavColumnProps> = ({ activeView, onSelectView, t }) => (
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
