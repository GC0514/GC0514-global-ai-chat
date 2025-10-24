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
    // Fix: Add optional 'relationship_matrix' to Persona type to resolve errors in persona definition files.
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
            strategicAlignment: number; // Represents the deep, slow-moving relationship (e.g., -10 for rivals, 10 for allies)
            currentStanding: number;    // Represents the current, faster-moving "goodwill" (e.g., -10 for hostile, 10 for friendly)
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
}

export interface Message {
    id: number;
    chatId: string;
    senderId: string;
    title?: string;
    text: string;
    timestamp: number;
}

export interface Chat {
    id: string;
    name: string;
    type: 'group' | 'private';
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
}