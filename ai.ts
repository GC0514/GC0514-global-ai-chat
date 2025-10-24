import { Message, Chat, AiIntensity, Country, Persona, NewsItem } from './types';

const getRelationship = (responder: Country, instigatorId: string): 'ally' | 'rival' | 'neutral' => {
    const relationshipData = responder.relationships[instigatorId];
    if (!relationshipData) {
        return 'neutral';
    }

    const combinedScore = relationshipData.strategicAlignment + relationshipData.currentStanding;

    if (combinedScore > 3) {
        return 'ally';
    }
    if (combinedScore < -3) {
        return 'rival';
    }
    return 'neutral';
};

export const generateInitialGoals = (
    allCountries: Record<string, Country>,
    knowledgeBase: NewsItem[]
): Record<string, Country> => {
    const updatedCountries = { ...allCountries };

    for (const countryId in updatedCountries) {
        const country = updatedCountries[countryId];
        if (!country.persona) continue;

        let short_term = 'Assess global situation and maintain stability.';
        let long_term = 'Ensure national prosperity and security through diplomatic means.';
        
        // Simplified goal generation logic based on persona and knowledge base
        const interests = country.persona.core_interests;

        // Example for Tech Powers and Semiconductor Shortage
        if ((interests.economic.includes('technological supremacy') || interests.economic.includes('high-tech')) && knowledgeBase.some(e => e.id === 'kb_1')) {
            short_term = 'Form a strategic alliance to secure our national semiconductor supply chain.';
            long_term = 'Achieve self-sufficiency in critical next-generation technologies.';
        }
        
        // Example for Arctic Nations
        if (interests.security.includes('Arctic') && knowledgeBase.some(e => e.id === 'kb_2')) {
            short_term = 'Assert sovereignty over our Arctic territories and shipping lanes.';
            long_term = 'Become the leading power in Arctic resource development and governance.';
        }

        // Example for France/Sahel nations
        if (interests.security.includes('Sahel') && knowledgeBase.some(e => e.id === 'kb_3')) {
            short_term = 'Launch a new joint initiative to contain the escalating instability in the Sahel.';
            long_term = 'Establish a self-sustaining regional security framework that reduces reliance on external powers.';
        }

        // Example for Energy Exporters and Green Hydrogen
        if (interests.economic.includes('energy') && knowledgeBase.some(e => e.id === 'kb_4')) {
            short_term = 'Establish favorable international standards for "green hydrogen" to benefit our export economy.';
            long_term = 'Become a world-leading exporter of green hydrogen and other renewable energy sources.';
        }
        
        country.goals = { short_term, long_term };
    }
    return updatedCountries;
};


const generateStatement = (responder: Country, instigator: Country, relationship: 'ally' | 'rival' | 'neutral', intensity: AiIntensity): { assessment: string, statement: string } => {
    const persona = responder.persona as Persona;
    let assessment = '';
    let statement = '';

    const intensityMultiplier = { simple: 0, medium: 1, high: 2, intense: 3 };
    const level = intensityMultiplier[intensity];

    // **Goal-Driven Logic**: 50% chance to proactively pursue a goal
    if (Math.random() < 0.5) {
        assessment = `(Internal Assessment: An opportunity to advance our agenda. Our current short-term goal is: "${responder.goals.short_term}". I will pivot the conversation.)`;
        statement = `While ${responder.name} acknowledges the points made by ${instigator.name}, we believe the international community's focus must be directed towards a more pressing issue. In line with our objective to "${responder.goals.short_term}", we propose that...`;
    } else {
        // **Relationship-Driven Logic (original logic)**
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
    }


    // Add persona-specific rhetorical flair
    if (persona.communication_style.rhetoric.length > 0) {
        statement += ` As our history teaches us, ${persona.communication_style.rhetoric[Math.floor(Math.random() * persona.communication_style.rhetoric.length)]}.`;
    }

    return { assessment, statement };
};

export const evaluateAndGetRelationshipUpdates = (
    triggerMessage: Message, 
    chat: Chat, 
    allCountries: Record<string, Country>
): Record<string, { targetId: string, change: number }> => {
    const senderId = triggerMessage.senderId;
    if (senderId === 'observer' || senderId === 'news_flash') return {};

    const updates: Record<string, { targetId: string, change: number }> = {};
    const sender = allCountries[senderId];

    for (const participantId of chat.participants) {
        if (participantId === senderId || participantId === 'observer' || !allCountries[participantId].persona) continue;

        const participant = allCountries[participantId];
        const relationshipToSender = getRelationship(participant, senderId);
        let change = 0;

        // Simple evaluation: allies agreeing strengthens ties, rivals disagreeing worsens them.
        switch (relationshipToSender) {
            case 'ally':
                // For simplicity, we assume any statement by an ally is supportive for now.
                // A more complex model could analyze text sentiment.
                change = 0.5;
                break;
            case 'rival':
                // Assume any statement by a rival is negative.
                change = -0.5;
                break;
            case 'neutral':
                // Neutral relationships change more slowly.
                // A more complex model could check if the statement attacks one of the participant's allies.
                change = 0;
                break;
        }

        if (change !== 0) {
            updates[participantId] = { targetId: senderId, change };
        }
    }
    return updates;
};


export const generatePublicResponse = (
    triggerMessage: Message, 
    chat: Chat, 
    intensity: AiIntensity, 
    countries: Record<string, Country>
): Message[] => {
    const instigatorId = triggerMessage.senderId;
    // News flashes are from a neutral source, so we can pick a random country to be the "instigator"
    // to simulate a reaction to a global event. The observer is the main user.
    const instigator = instigatorId === 'news_flash' || instigatorId === 'observer' 
        ? countries['USA'] // Default to a major power for reactions to neutral events
        : countries[instigatorId];

    if (!instigator) return [];

    const intensityMap = {
        simple: 0.1,
        medium: 0.3,
        high: 0.6,
        intense: 0.9,
    };
    
    const tierChanceMultipliers = {
        1: 1.0,
        2: 0.5,
        3: 0.15,
    };

    const potentialResponders = chat.participants
        .filter(pId => {
            const country = countries[pId];
            if (!country || pId === instigatorId || pId === 'observer') return false;
            
            const baseChance = intensityMap[intensity] * tierChanceMultipliers[country.tier];
            const finalChance = country.persona ? baseChance * 1.2 : baseChance;

            return Math.random() < Math.min(finalChance, 1.0);
        })
        .map(pId => countries[pId]);

    return potentialResponders.map((country, index) => {
        if (!country.persona) {
             return {
                id: Date.now() + index,
                chatId: chat.id,
                senderId: country.id,
                text: `${country.name} acknowledges the ongoing discussion. We are monitoring the situation closely.`,
                timestamp: Date.now() + (index + 1) * 1500,
            };
        }

        const relationship = getRelationship(country, instigator.id);
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

export const generatePrivateResponse = (
    triggerMessage: Message, 
    chat: Chat,
    countries: Record<string, Country>
): Message => {
    const countryId = chat.participants.find(p => p !== 'observer')!;
    const country = countries[countryId];
    const userText = triggerMessage.text.toLowerCase();
    let responseText = '';

    if (userText.includes('your goal') || userText.includes('objective')) {
        responseText = `Privately, our current short-term focus is to "${country.goals.short_term}". This guides our immediate actions on the global stage.`;
    } else if (userText.includes('politic') || userText.includes('government') || userText.includes('stance')) {
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