import React, { useState, useRef, useEffect } from 'react';
import { WorldStateMetrics, Country, NewsItem, PowerBlocMetrics } from '../types';
import { BREAKING_NEWS_OPTIONS, RANDOM_EVENT_TEMPLATES } from '../../data';

// --- SUB-COMPONENTS for COMMAND VIEW ---

const generateFakeNewsOptions = (countries: Country[], count = 3): NewsItem[] => {
    const options: NewsItem[] = [];
    for (let i = 0; i < count; i++) {
        const template = RANDOM_EVENT_TEMPLATES[Math.floor(Math.random() * RANDOM_EVENT_TEMPLATES.length)];
        const involvedCountries = [...countries].sort(() => 0.5 - Math.random()).slice(0, 2);
        if (involvedCountries.length < 2) continue;
        const region = involvedCountries[0].continent;

        let title = template.title.replace('[COUNTRY_A]', involvedCountries[0].name).replace('[COUNTRY_B]', involvedCountries[1].name).replace('[REGION]', region);
        let snippet = template.snippet.replace('[COUNTRY_A]', involvedCountries[0].name).replace('[COUNTRY_B]', involvedCountries[1].name).replace('[REGION]', region);

        options.push({
            id: `fake_${Date.now()}_${i}`,
            title,
            snippet,
            source: template.source,
            isFabricated: true,
        });
    }
    return options;
};

const NewsPicker: React.FC<{ type: 'real' | 'fake'; countries: Country[]; onSelect: (item: NewsItem) => void; onClose: () => void; }> = ({ type, countries, onSelect, onClose }) => {
    const pickerRef = useRef<HTMLDivElement>(null);
    const [newsOptions, setNewsOptions] = useState<NewsItem[]>([]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    useEffect(() => {
        if (type === 'real') {
            setNewsOptions(BREAKING_NEWS_OPTIONS);
        } else {
            setNewsOptions(generateFakeNewsOptions(countries));
        }
    }, [type, countries]);

    const today = new Date().toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="popup-panel news-picker" ref={pickerRef}>
            <div className="news-picker-header">{today}</div>
            <ul className="news-picker-list">
                {newsOptions.map(item => (
                    <li key={item.id} className={`news-picker-item ${item.isFabricated ? 'fabricated' : ''}`} onClick={() => onSelect(item)}>
                        <h4>{item.isFabricated && '💣 '}{item.title}</h4>
                        <p>{item.snippet}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const StatCard: React.FC<{ icon: string, label: string, value: string | number, color?: string }> = ({ icon, label, value, color }) => (
    <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: color }}>{icon}</div>
        <div className="stat-info">
            <div className="stat-label">{label}</div>
            <div className="stat-value">{value}</div>
        </div>
    </div>
);

const BlocMetricsCard: React.FC<{ name: string, metrics: PowerBlocMetrics }> = ({ name, metrics }) => (
    <div className="bloc-card">
        <h4>{name}</h4>
        <p>Avg. Econ Stability: {metrics.avgEconomicStability.toFixed(1)}</p>
        <p>Avg. Domestic Support: {metrics.avgDomesticSupport.toFixed(1)}</p>
    </div>
);


export const CommandView: React.FC<{
    metrics: WorldStateMetrics | null;
    onOpenSummitModal: () => void;
    onOpenIntelModal: () => void;
    onPostNewsEvent: (item: NewsItem) => void;
    countries: Record<string, Country>;
}> = ({ metrics, onOpenSummitModal, onOpenIntelModal, onPostNewsEvent, countries }) => {
    const [activePopup, setActivePopup] = useState<string | null>(null);

    return (
        <main className="command-view-grid frosted-panel">
            <header className="chat-header">Command & Control Center</header>
            
            <div style={{overflowY: 'auto'}}>
                <div className="dashboard-section">
                    <h3>Global Situation Dashboard</h3>
                    <div className="dashboard-grid">
                        <StatCard icon="📈" label="Global Economic Index" value={metrics?.globalEconomicIndex.toFixed(1) ?? '...'} color="rgba(76, 175, 80, 0.2)" />
                        <StatCard icon="🔥" label="Int'l Tension Level" value={metrics?.internationalTensionLevel.toFixed(1) ?? '...'} color="rgba(244, 67, 54, 0.2)" />
                        <StatCard icon="✍️" label="Active Pacts" value={metrics?.activePactsCount ?? '...'} color="rgba(33, 150, 243, 0.2)" />
                    </div>
                    <h3>Power Bloc Analysis</h3>
                    <div className="bloc-grid">
                        {metrics?.g7Metrics && <BlocMetricsCard name="G7" metrics={metrics.g7Metrics} />}
                        {metrics?.bricsMetrics && <BlocMetricsCard name="BRICS" metrics={metrics.bricsMetrics} />}
                        {metrics?.scoMetrics && <BlocMetricsCard name="SCO" metrics={metrics.scoMetrics} />}
                        {metrics?.natoMetrics && <BlocMetricsCard name="NATO" metrics={metrics.natoMetrics} />}
                    </div>
                </div>

                <div className="operations-section">
                    <h3>Central Operations Panel</h3>
                    <div className="operations-grid">
                        <div className="toolbar-button-wrapper">
                            <button className="op-button" onClick={() => setActivePopup(p => p === 'news-real' ? null : 'news-real')}>📰 Publish Official News</button>
                            {activePopup === 'news-real' && <NewsPicker type='real' countries={[]} onSelect={item => { onPostNewsEvent(item); setActivePopup(null); }} onClose={() => setActivePopup(null)} />}
                        </div>
                        <div className="toolbar-button-wrapper">
                            <button className="op-button" onClick={() => setActivePopup(p => p === 'news-fake' ? null : 'news-fake')}>💣 Fabricate & Leak Story</button>
                            {activePopup === 'news-fake' && <NewsPicker type='fake' countries={Object.values(countries)} onSelect={item => { onPostNewsEvent(item); setActivePopup(null); }} onClose={() => setActivePopup(null)} />}
                        </div>
                        <button className="op-button" onClick={onOpenSummitModal}>🏛️ Host Global Summit</button>
                        <button className="op-button" onClick={onOpenIntelModal}>🤫 Leak Raw Intelligence</button>
                    </div>
                </div>
            </div>
        </main>
    );
};
