import React, { useState } from 'react';

interface LeakIntelModalProps {
    onClose: () => void;
    onLeak: (intel: string) => void;
}

export const LeakIntelModal: React.FC<LeakIntelModalProps> = ({ onClose, onLeak }) => {
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
