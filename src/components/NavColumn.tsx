import React from 'react';

type ActiveView = 'chats' | 'directory' | 'chronicle' | 'command';

interface NavColumnProps {
    activeView: ActiveView;
    onSelectView: (view: ActiveView) => void;
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
        <div className={`nav-item ${activeView === 'command' ? 'active' : ''}`} onClick={() => onSelectView('command')}>
            <span className="icon">📡</span>
            <span className="label">Command</span>
        </div>
        <div className={`nav-item ${activeView === 'chronicle' ? 'active' : ''}`} onClick={() => onSelectView('chronicle')}>
            <span className="icon">📜</span>
            <span className="label">Chronicle</span>
        </div>
    </nav>
);