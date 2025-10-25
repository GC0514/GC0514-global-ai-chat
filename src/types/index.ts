export interface Persona {
    national_identity: {
        theme: string;
        narrative: string;
    };
    communication_style: {
        tone: 'assertive' | 'conciliatory' | 'formal' | 'indirect' | 'principled';
        rhetoric: string[];
    };
    core_interests: {
        economic: string;
        security: string;
        ideological: string;
    };
    behavioral_patterns: {
        towards_allies: string;
        towards_rivals: string;
        in_crisis: string;
    };
    historical_context: string[];
    relationship_matrix?: {
        allies: string[];
        rivals: string[];
    };
}

export interface Pact {
    id: string;
    type: 'non_aggression' | 'economic_cooperation' | 'tech_sharing';
    participants: [string, string];
    status: 'proposed' | 'active' | 'broken' | 'negotiating' | 'rejected';
    proposer: string; // Country ID
    expires: number; // Turn number
}

export interface Country {
    id: string;
    name: string;
    avatar: string;
    continent: string;
    tier: 1 | 2 | 3;
    persona?: Persona;
    relationships: {
        [key: string]: {
            strategicAlignment: number;
            currentStanding: number;
        }
    };
    goals: {
        short_term: string;
        long_term: string;
    };
    profile: string;
    detailedProfile: string;
    motto: string;
    established: string;
    nationalDay: string;
    newYear: string;
    language: string;
    ethnic_groups: string[];
    population: string;
    economicStability: number;
    domesticSupport: number;
    militaryAlertLevel: number;
    privateConsensus?: Array<{
        with: string[],
        topic: string,
        stance: string,
        turnExpires: number,
    }>;
    activePacts: Pact[];
    observerTrust: number;
}

export interface Message {
    id: number;
    chatId: string;
    senderId: 'observer' | 'news_flash' | 'intel_leak' | 'system' | 'world_event' | 'pact_event' | string; // Can be country ID or special sender
    title?: string;
    text: string;
    timestamp: number;
    isFabricated?: boolean;
}

export interface Chat {
    id: string;
    name: string;
    type: 'group' | 'private' | 'summit' | 'pact';
    participants: string[];
}

export type AiIntensity = 'simple' | 'medium' | 'high' | 'intense';

export interface NewsItem {
    id: string;
    title: string;
    snippet: string;
    source: string;
    tags?: string[];
    involved_countries?: string[];
    isFabricated?: boolean;
}

export interface WorldEvent {
    id: number;
    turn: number;
    type: 'pact_proposed' | 'pact_accepted' | 'pact_rejected' | 'pact_expired' | 'pact_broken' | 'world_crisis' | 'intel_success' | 'intel_failure' | 'news_published' | 'goal_change';
    description: string;
    relatedCountryIds: string[];
}

export interface PowerBlocMetrics {
    avgEconomicStability: number;
    avgDomesticSupport: number;
}

export interface WorldStateMetrics {
    globalEconomicIndex: number;
    internationalTensionLevel: number;
    activePactsCount: number;
    g7Metrics: PowerBlocMetrics;
    bricsMetrics: PowerBlocMetrics;
    scoMetrics: PowerBlocMetrics;
    natoMetrics: PowerBlocMetrics;
}
