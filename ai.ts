import { Message, Chat, AiIntensity, Country } from './types';
import { COUNTRIES } from './data';

const getRelationship = (responder: Country, instigatorId: string): 'ally' | 'rival' | 'neutral' => {
    if (!responder.persona) return 'neutral';
    if (responder.persona.relationship_matrix.allies.includes(instigatorId)) return 'ally';
    if (responder.persona.relationship_matrix.rivals.includes(instigatorId)) return 'rival';
    return 'neutral';
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
        .filter(pId => pId !== triggerMessage.senderId && COUNTRIES[pId] && Math.random() < intensityMap[intensity])
        .map(pId => COUNTRIES[pId]);

    return potentialResponders.map((country, index) => {
        const relationship = getRelationship(country, triggerMessage.senderId);
        let statement = '';
        let assessment = '';

        switch (relationship) {
            case 'ally':
                assessment = `(Internal Assessment: An opportunity to reinforce our alliance with ${instigator.name}.)`;
                statement = `On behalf of ${country.name}, we stand in solidarity with our partner, ${instigator.name}. Their perspective is valuable and deserves serious consideration by this council. We support this dialogue.`;
                break;
            case 'rival':
                assessment = `(Internal Assessment: We must challenge ${instigator.name}'s narrative.)`;
                statement = `For ${country.name}, the statement from ${instigator.name} raises more questions than answers. We must scrutinize these claims carefully and insist on a transparent process that respects international norms, not just one nation's agenda.`;
                break;
            case 'neutral':
            default:
                assessment = `(Internal Assessment: A neutral stance is wisest. Observe and gather information.)`;
                statement = `${country.name} acknowledges the points raised. We are listening to all parties and encourage continued constructive dialogue to find a peaceful and mutually acceptable resolution.`;
                break;
        }
        
        if (intensity === 'high' || intensity === 'intense') {
            if(relationship === 'rival') {
                statement += " We will not stand by and allow unilateral actions to undermine global stability."
            }
            if(relationship === 'ally') {
                statement += " We are confident that our shared values will lead to a positive outcome."
            }
        }
        if(intensity === 'intense' && relationship === 'rival'){
            statement = `The rhetoric from ${instigator.name} is unacceptable and a direct threat to the established order! ${country.name} categorically rejects this position and calls on all responsible nations to condemn this reckless posturing.`;
        }


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
