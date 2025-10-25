import React, { useState } from 'react';
import { Country } from '../../types';

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
                    {Object.values(countries).map((c: Country) => (
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
