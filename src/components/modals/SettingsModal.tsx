import React from 'react';
import { AiIntensity } from '../../types';

interface SettingsModalProps {
    onClose: () => void;
    theme: 'dark' | 'light';
    onThemeChange: (theme: 'dark' | 'light') => void;
    language: 'en' | 'zh';
    onLanguageChange: (lang: 'en' | 'zh') => void;
    intensity: AiIntensity;
    onIntensityChange: (intensity: AiIntensity) => void;
    t: Record<string, any>;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, theme, onThemeChange, language, onLanguageChange, intensity, onIntensityChange, t }) => (
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
                    {['simple', 'medium', 'high', 'intense'].map((level) => (
                        <button key={level} className={intensity === level ? 'active' : ''} onClick={() => onIntensityChange(level as AiIntensity)}>
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
