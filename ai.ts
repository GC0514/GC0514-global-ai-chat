import { Message, Chat, AiIntensity } from './types';
import { COUNTRIES } from './data';

export const generatePublicResponse = (triggerMessage: Message, chat: Chat, intensity: AiIntensity): Message[] => {
    const intensityMap = {
        simple: { responders: 0.1, complexity: 0.1 },
        medium: { responders: 0.3, complexity: 0.4 },
        high: { responders: 0.6, complexity: 0.7 },
        intense: { responders: 0.9, complexity: 1.0 },
    };

    const settings = intensityMap[intensity];
    const maxResponders = Math.max(1, Math.floor(chat.participants.length * settings.responders));
    const numResponders = Math.floor(Math.random() * maxResponders) + 1;

    const respondingCountries = chat.participants
        .filter(pId => pId !== triggerMessage.senderId && COUNTRIES[pId])
        .sort(() => 0.5 - Math.random())
        .slice(0, numResponders);

    return respondingCountries.map((countryId, index) => {
        const country = COUNTRIES[countryId];
        const isOpportunity = Math.random() > 0.5;
        let publicStatement = '';
        let innerThought = `(Internal assessment: This is a ${isOpportunity ? 'potential opportunity' : 'clear threat'} to our interests.)`;

        switch (intensity) {
            case 'simple':
                publicStatement = `On behalf of ${country.name}, we are listening to all perspectives and appreciate the dialogue.`;
                innerThought = `(Internal assessment: Acknowledging the topic.)`
                break;
            case 'medium':
                publicStatement = `On behalf of ${country.name}, we believe that international cooperation is the most effective path forward to address this issue.`;
                break;
            case 'high':
                publicStatement = `On behalf of ${country.name}, while we value diplomatic solutions, our nation's core interests are paramount. Any resolution must respect our sovereignty and strategic position.`;
                break;
            case 'intense':
                innerThought = `(Internal assessment: This is a critical situation! We must assert our position forcefully.)`
                publicStatement = `For ${country.name}, this is not merely a topic for debate; it is a fundamental challenge to the global order. We urge all nations to recognize the gravity of the situation. Inaction is not an option, and our stance is resolute and UNYIELDING.`;
                break;
        }

        return {
            id: Date.now() + index, chatId: chat.id, senderId: country.id,
            text: `${innerThought}\n\n${publicStatement}`,
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
