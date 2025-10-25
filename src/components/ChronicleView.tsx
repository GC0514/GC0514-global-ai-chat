import React from 'react';
import { WorldEvent, Country } from '../types';

interface ChronicleViewProps {
    events: WorldEvent[];
    countries: Record<string, Country>;
}

const getIconForEventType = (type: WorldEvent['type']) => {
    switch (type) {
        case 'pact_proposed':
        case 'pact_accepted':
        case 'pact_rejected':
        case 'pact_expired':
        case 'pact_broken':
            return '✍️';
        case 'world_crisis':
            return '🚨';
        case 'intel_success':
            return '👁️';
        case 'intel_failure':
            return '🤫';
        case 'news_published':
            return '📰';
        case 'goal_change':
            return '🎯';
        default:
            return '📜';
    }
};

export const ChronicleView: React.FC<ChronicleViewProps> = ({ events, countries }) => {
    
    const sortedEvents = [...events].sort((a, b) => b.turn - a.turn);

    return (
        <main className="chat-window frosted-panel" style={{ gridColumn: '2 / 4', padding: '0' }}>
            <header className="chat-header">
                World Chronicle
            </header>
            <div className="message-list" style={{ gap: '0.5rem' }}>
                {sortedEvents.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>
                        The pages of history are blank. Your actions will write the story.
                    </div>
                ) : (
                    sortedEvents.map(event => (
                        <div key={event.id} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '1rem', 
                            padding: '0.75rem', 
                            borderBottom: '1px solid var(--border-color)' 
                        }}>
                            <div style={{ 
                                flexShrink: 0, 
                                textAlign: 'center', 
                                color: 'var(--text-secondary)',
                                fontWeight: '500',
                                width: '80px'
                            }}>
                                Turn <br/>
                                <span style={{ fontSize: '1.5rem', color: 'var(--text-primary)'}}>{event.turn}</span>
                            </div>
                            <div style={{ 
                                flexShrink: 0, 
                                fontSize: '1.5rem',
                                paddingRight: '1rem',
                                borderRight: '1px solid var(--border-color)'
                            }}>
                                {getIconForEventType(event.type)}
                            </div>
                            <div style={{ flexGrow: 1, lineHeight: '1.5' }}>
                                {event.description}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
};