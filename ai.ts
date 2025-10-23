import { Message, Chat, AiIntensity, Country, Persona } from './types';
import { COUNTRIES } from './data';

const getRelationship = (responder: Country, instigatorId: string): 'ally' | 'rival' | 'neutral' => {
    if (!responder.persona) return 'neutral';
    if (responder.persona.relationship_matrix.allies.includes(instigatorId)) return 'ally';
    if (responder.persona.relationship_matrix.rivals.includes(instigatorId)) return 'rival';
    return 'neutral';
};

const generateStatement = (responder: Country, instigator: Country, relationship: 'ally' | 'rival' | 'neutral', intensity: AiIntensity): { assessment: string, statement: string } => {
    const persona = responder.persona as Persona;
    let assessment = '';
    let statement = '';

    const intensityMultiplier = { simple: 0, medium: 1, high: 2, intense: 3 };
    const level = intensityMultiplier[intensity];

    switch (relationship) {
        case 'ally':
            assessment = `(Internal Assessment: An opportunity to reinforce our alliance with ${instigator.name}. This aligns with our interest in ${persona.core_interests.security}.)`;
            statement = `On behalf of ${responder.name}, we stand in solidarity with our partner, ${instigator.name}. ${persona.behavioral_patterns.towards_allies}`;
            if (level > 1) statement += ` We fully endorse their position and will offer our support.`;
            break;
        case 'rival':
            assessment = `(Internal Assessment: We must challenge ${instigator.name}'s narrative. This action potentially undermines our interest in ${persona.core_interests.economic} and ${persona.core_interests.security}.)`;
            statement = `The statement from ${instigator.name} is viewed with concern by ${responder.name}. ${persona.behavioral_patterns.towards_rivals}`;
            if (level > 1) statement += ` We urge other nations to consider the implications of such rhetoric.`;
            if (level > 2) statement = `The baseless assertions from ${instigator.name} are a direct threat to stability! ${responder.name} unequivocally condemns this and will consider all necessary measures to protect its interests.`;
            break;
        case 'neutral':
        default:
            assessment = `(Internal Assessment: A neutral stance is wisest. We will observe how this affects our interest in ${persona.core_interests.economic}.)`;
            statement = `${responder.name} acknowledges the points raised. We are listening to all parties and encourage continued constructive dialogue to find a peaceful resolution.`;
            break;
    }

    // Add persona-specific rhetorical flair
    if (persona.communication_style.rhetoric.length > 0) {
        statement += ` As our history teaches us, ${persona.communication_style.rhetoric[Math.floor(Math.random() * persona.communication_style.rhetoric.length)]}.`;
    }

    return { assessment, statement };
};


export const generatePublicResponse = (triggerMessage: Message, chat: Chat, intensity: AiIntensity): Message[] => {
    const instigator = COUNTRIES[triggerMessage.senderId];
    if (!instigator) return [];

    const intensityMap = {
        simple: 0.1,
        medium: 0.3,
        high: 0.6,
        intense: 0.9,
    };

    const potentialResponders = chat.participants
        .filter(pId => {
            const country = COUNTRIES[pId];
            // AI countries with a defined persona are more likely to respond
            const baseChance = country && country.persona ? intensityMap[intensity] * 1.5 : intensityMap[intensity];
            return pId !== triggerMessage.senderId && country && Math.random() < Math.min(baseChance, 1.0);
        })
        .map(pId => COUNTRIES[pId]);

    return potentialResponders.map((country, index) => {
        if (!country.persona) { // Generic response for countries without a detailed persona
             return {
                id: Date.now() + index,
                chatId: chat.id,
                senderId: country.id,
                text: `${country.name} acknowledges the ongoing discussion. We are monitoring the situation closely.`,
                timestamp: Date.now() + (index + 1) * 1500,
            };
        }

        const relationship = getRelationship(country, triggerMessage.senderId);
        const { assessment, statement } = generateStatement(country, instigator, relationship, intensity);
       
        return {
            id: Date.now() + index,
            chatId: chat.id,
            senderId: country.id,
            text: `${assessment}\n\n${statement}`,
            timestamp: Date.now() + (index + 1) * 1500,
        };
    });
};

export const generatePrivateResponse = (triggerMessage: Message, chat: Chat): Message => {
    const countryId = chat.participants.find(p => p !== 'observer')!;
    const country = COUNTRIES[countryId];
    const userText = triggerMessage.text.toLowerCase();
    let responseText = '';

    if (userText.includes('politic') || userText.includes('government') || userText.includes('stance')) {
        responseText = `Candidly, our political stance is guided by our core interests. While we advocate for diplomacy publicly, we must also ensure our nation's security and economic prosperity are never compromised.`;
    } else if (userText.includes('culture') || userText.includes('history') || userText.includes('food')) {
        responseText = `I'd be delighted to tell you about that! ${country.name} has a rich cultural heritage. Our cuisine is famous for its unique flavors, and historical landmarks attract visitors worldwide.`;
    } else {
        responseText = `Hello! It's a pleasure to speak with you directly. I represent ${country.name}. How can I assist you?`;
    }

    return {
        id: Date.now(), chatId: chat.id, senderId: country.id,
        text: responseText, timestamp: Date.now() + 1000,
    };
};