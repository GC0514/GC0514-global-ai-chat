import React from 'react';

interface HeaderProps {
    onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => (
    <header className="app-header frosted-panel">
        <div className="user-avatar">👤</div>
        <button className="settings-button" onClick={onSettingsClick} aria-label="Settings">⚙️</button>
    </header>
);
