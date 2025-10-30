import React, { useState } from 'react';
import { Country, Pact } from '../../types';

interface ProposePactModalProps {
    sourceCountry: Country;
    countries: Record<string, Country>;
    onClose: () => void;
    onPropose: (sourceId: string, targetId: string, pactType: Pact['type']) => void;
}

export const ProposePactModal: React.FC<ProposePactModalProps> = ({ sourceCountry, countries, onClose, onPropose }) => {
    const [targetId, setTargetId] = useState('');
    const [pactType, setPactType] = useState<Pact['type']>('non_aggression');
    
    // Fix: Explicitly type 'c' as Country to resolve properties on type 'unknown'.
    const availableTargets = Object.values(countries).filter((c: Country) => c.id !== sourceCountry.id);

    const handleSubmit = () => {
        if (targetId) {
            onPropose(sourceCountry.id, targetId, pactType);
        }
    };
    
    const pactDescriptions = {
        non_aggression: 'Both nations agree not to engage in hostile actions against one another.',
        economic_cooperation: 'Both nations agree to lower trade barriers and promote mutual investment.',
        tech_sharing: 'Both nations agree to collaborate on research and share technological advancements.'
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3 className="modal-name">Propose Pact</h3>
                <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 1.5rem 0' }}>
                    Proposing a pact from {sourceCountry.avatar} <strong>{sourceCountry.name}</strong>.
                </p>

                <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                    <label htmlFor="targetCountry" style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Select Target Nation:</label>
                    <select
                        id="targetCountry"
                        value={targetId}
                        onChange={e => setTargetId(e.target.value)}
                        className="setting-select"
                        style={{ width: '100%', fontSize: '1rem' }}
                    >
                        <option value="" disabled>Choose a country...</option>
                        {availableTargets.map((c: Country) => (
                            <option key={c.id} value={c.id}>{c.avatar} {c.name}</option>
                        ))}
                    </select>
                </div>
                
                <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                    <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Select Pact Type:</label>
                    <div className="segmented-control">
                        <button className={pactType === 'non_aggression' ? 'active' : ''} onClick={() => setPactType('non_aggression')}>🤝 Non-Aggression</button>
                        <button className={pactType === 'economic_cooperation' ? 'active' : ''} onClick={() => setPactType('economic_cooperation')}>📈 Economic</button>
                        <button className={pactType === 'tech_sharing' ? 'active' : ''} onClick={() => setPactType('tech_sharing')}>🔬 Tech Sharing</button>
                    </div>
                     <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        {pactDescriptions[pactType]}
                    </p>
                </div>

                <div className="modal-actions">
                    <button className="modal-button secondary" onClick={onClose}>Cancel</button>
                    <button className="modal-button primary" onClick={handleSubmit} disabled={!targetId}>Propose</button>
                </div>
            </div>
        </div>
    );
};