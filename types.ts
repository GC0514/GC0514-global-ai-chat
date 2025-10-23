export interface Country {
    id: string;
    name: string;
    avatar: string;
    continent: string;
    persona: string;
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
