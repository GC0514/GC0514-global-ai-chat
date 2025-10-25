import React, { useState } from 'react';
import { Country, Pact } from '../../types';
import { useSimulationContext } from '../../context/SimulationContext';

type IntelOperationType = 'monitor' | 'sabotage' | 'unrest';

interface CountryProfileModalProps {
    country: Country;
    countries: Record<string, Country>;
    onClose: () => void;
    onStartChat: () => void;
    onProposePact: (sourceCountry: Country) => void;
    onIntelOperation: (targetId: string, operationType: IntelOperationType) => void;
    t: Record<string, any>;
    currentTurn: number;
}

export const CountryProfileModal: React.FC<CountryProfileModalProps> = ({ country, countries, onClose, onStartChat, onProposePact, onIntelOperation, t, currentTurn }) => {
    const [view, setView] = useState<'main' | 'details'>('main');
    const { revealedGoals } = useSimulationContext();
    const isObserverCountry = country.id === 'observer'; // Assuming an observer might be represented this way

    const revealedGoal = revealedGoals[country.id];
    const hasRevealedGoal = revealedGoal && revealedGoal.turnExpires > currentTurn;

    const renderPacts = () => {
        const activePacts = country.activePacts?.filter(p => p.status === 'active') || [];
        if (activePacts.length === 0) return null;

        const getOtherParty = (pact: Pact) => {
            const otherId = pact.participants.find(p => p !== country.id);
            if (otherId && countries[otherId]) {
                return `${countries[otherId].avatar} ${countries[otherId].name}`;
            }
            return 'Unknown Party';
        };

        return (
             <div className="profile-details" style={{marginTop: '1rem'}}>
                <dl>
                    <dt>Active Pacts</dt>
                    <dd>
                        <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                            {activePacts.map((pact) => (
                                <li key={pact.id} style={{marginBottom: '0.25rem'}}>
                                    <strong>{pact.type.replace(/_/g, ' ')}</strong> with {getOtherParty(pact)}
                                    <br />
                                    <small style={{color: 'var(--text-secondary)'}}>
                                        (Expires in {Math.max(0, pact.expires - currentTurn)} turns)
                                    </small>
                                </li>
                            ))}
                        </ul>
                    </dd>
                </dl>
            </div>
        )
    };
    
    const handleOperationClick = (opType: IntelOperationType) => {
        onIntelOperation(country.id, opType);
        onClose(); // Close modal after action
    };

    const ObserverActions = () => (
        <div className="profile-details" style={{ borderTop: '1px solid var(--border-color)', marginTop: '1rem', paddingTop: '1rem' }}>
            <dl>
                <dt>🕵️ Observer Actions</dt>
                <dd style={{color: 'var(--text-primary)'}}>Trust: {country.observerTrust}/100</dd>
            </dl>
            <div className="modal-actions" style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                <button className="modal-button secondary" onClick={() => handleOperationClick('monitor')} title="Attempt to reveal this country's short-term goal. High success rate, low risk.">👁️ Monitor Country</button>
                <button className="modal-button secondary" onClick={() => handleOperationClick('sabotage')} title="Attempt to damage this country's economy. Medium success rate, high risk.">📉 Economic Sabotage</button>
                <button className="modal-button secondary" onClick={() => handleOperationClick('unrest')} title="Attempt to lower this country's domestic support. Medium success rate, high risk.">🔥 Promote Unrest</button>
            </div>
        </div>
    );

    const MainView = () => (
        <>
            <p className="modal-description">{country.profile}</p>
            <div className="profile-details">
                <dl>
                    <dt>📈 {t.economicStability}</dt><dd>{country.economicStability.toFixed(0)} / 100</dd>
                    <dt>❤️ {t.domesticSupport}</dt><dd>{country.domesticSupport.toFixed(0)} / 100</dd>
                    <dt>⚠️ {t.militaryAlertLevel}</dt><dd>{country.militaryAlertLevel.toFixed(0)} / 100</dd>
                    <dt>{t.shortTermGoal}</dt>
                    <dd>
                        {hasRevealedGoal ? (
                             <span title={`Revealed until turn ${revealedGoal.turnExpires}`}>🤫 <em>"{revealedGoal.goal}"</em></span>
                        ) : (
                            "Unknown"
                        )}
                    </dd>
                    <dt>{t.longTermGoal}</dt><dd>{country.goals.long_term}</dd>
                </dl>
            </div>
            {renderPacts()}
             {!isObserverCountry && <ObserverActions />}
            <div className="modal-actions" style={{marginTop: '1.5rem'}}>
                <button className="modal-button secondary" onClick={() => setView('details')}>{t.details}</button>
                <button className="modal-button primary" onClick={onStartChat} disabled={isObserverCountry}>{t.chat}</button>
            </div>
            {!isObserverCountry && <div className="modal-actions" style={{marginTop: '0.5rem'}}>
                 <button className="modal-button secondary" style={{width: '100%'}} onClick={() => onProposePact(country)}>✍️ Propose Pact</button>
            </div>}
        </>
    );

    const DetailsView = () => (
        <>
            <p className="modal-description">{country.detailedProfile}</p>
            <div className="profile-details">
                 <dl>
                    <dt>{t.continent}</dt><dd>{country.continent}</dd>
                    <dt>{t.population}</dt><dd>{country.population}</dd>
                    <dt>{t.established}</dt><dd>{country.established}</dd>
                    <dt>{t.nationalDay}</dt><dd>{country.nationalDay}</dd>
                    <dt>{t.newYear}</dt><dd>{country.newYear}</dd>
                    <dt>{t.language}</dt><dd>{country.language}</dd>
                    <dt>{t.ethnicGroups}</dt><dd>{country.ethnic_groups.join(', ')}</dd>
                    <dt>{t.motto}</dt><dd><em>"{country.motto}"</em></dd>
                </dl>
            </div>
            <div className="modal-actions">
                <button className="modal-button secondary" onClick={() => setView('main')}>{t.back}</button>
                <button className="modal-button primary" onClick={onStartChat} disabled={isObserverCountry}>{t.chat}</button>
            </div>
        </>
    );

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>×</button>
                <div className="modal-avatar">{country.avatar}</div>
                <h3 className="modal-name">{country.name}</h3>
                {view === 'main' ? <MainView /> : <DetailsView />}
            </div>
        </div>
    );
};