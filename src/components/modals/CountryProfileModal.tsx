import React, { useState } from 'react';
import { Country } from '../../types';

interface CountryProfileModalProps {
    country: Country;
    onClose: () => void;
    onStartChat: () => void;
    t: Record<string, any>;
}

export const CountryProfileModal: React.FC<CountryProfileModalProps> = ({ country, onClose, onStartChat, t }) => {
    const [view, setView] = useState<'main' | 'details'>('main');

    const MainView = () => (
        <>
            <p className="modal-description">{country.profile}</p>
            <div className="profile-details">
                <dl>
                    <dt>📈 {t.economicStability}</dt><dd>{country.economicStability.toFixed(0)} / 100</dd>
                    <dt>❤️ {t.domesticSupport}</dt><dd>{country.domesticSupport.toFixed(0)} / 100</dd>
                    <dt>⚠️ {t.militaryAlertLevel}</dt><dd>{country.militaryAlertLevel.toFixed(0)} / 100</dd>
                    <dt>{t.shortTermGoal}</dt><dd>{country.goals.short_term}</dd>
                    <dt>{t.longTermGoal}</dt><dd>{country.goals.long_term}</dd>
                </dl>
            </div>
            <div className="modal-actions">
                <button className="modal-button secondary" onClick={() => setView('details')}>{t.details}</button>
                <button className="modal-button primary" onClick={onStartChat} disabled={country.id === 'observer'}>{t.chat}</button>
            </div>
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
                <button className="modal-button primary" onClick={onStartChat} disabled={country.id === 'observer'}>{t.chat}</button>
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