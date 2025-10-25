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
}

export interface Message {
    id: number;
    chatId: string;
    senderId: 'observer' | 'news_flash' | 'intel_leak' | 'system' | string; // Can be country ID or special sender
    title?: string;
    text: string;
    timestamp: number;
    isFabricated?: boolean;
}

export interface Chat {
    id: string;
    name: string;
    type: 'group' | 'private' | 'summit';
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
