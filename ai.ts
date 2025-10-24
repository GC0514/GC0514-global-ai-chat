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


const generateStatement = (
    responder: Country,
    instigator: Country,
    relationship: 'ally' | 'rival' | 'neutral',
    intensity: AiIntensity,
    messageHistory: Message[],
    allCountries: Record<string, Country>
): { assessment: string, statement: string } => {
    const persona = responder.persona as Persona;
    let assessment = '';
    let statement = '';

    const intensityMultiplier = { simple: 0, medium: 1, high: 2, intense: 3 };
    const level = intensityMultiplier[intensity];

    // **Contextual Memory Logic**
    const recentHistory = messageHistory.slice(-5);
    let contextSummary = "(Context: No recent messages.)";
    if (recentHistory.length > 1) {
        const lastFewSpeakers = recentHistory.map(m => allCountries[m.senderId]?.name || 'News').join(', ');
        // FIX: Replaced .at(-1) with array[array.length - 1] for wider compatibility with older TypeScript/JavaScript versions.
        const lastMessage = recentHistory[recentHistory.length - 1];
        const mainTopic = lastMessage?.title || lastMessage?.text.substring(0, 30) + '...';
        contextSummary = `(Context: Recent discussion on "${mainTopic}" involving ${lastFewSpeakers}.)`;
    }

    // **Goal-Driven Logic**: Higher chance to pursue a goal if the conversation is irrelevant or an opportunity arises.
    const shouldPursueGoal = Math.random() < 0.4;

    if (shouldPursueGoal) {
        assessment = `(Internal Assessment: ${contextSummary} This is an opportunity to advance our agenda. Our goal: "${responder.goals.short_term}". I will pivot.)`;
        statement = `${responder.name} has been following the discussion. However, we must not lose sight of a more pressing matter. In line with our objective to "${responder.goals.short_term}", we propose that...`;
    } else {
        // **Relationship and Context-Driven Logic**
        switch (relationship) {
            case 'ally':
                assessment = `(Internal Assessment: ${contextSummary} I will support my ally, ${instigator.name}. This aligns with our interest in ${persona.core_interests.security}.)`;
                statement = `${responder.name} concurs with the sentiment expressed by our partner, ${instigator.name}. ${persona.behavioral_patterns.towards_allies}`;
                if (level > 1) statement += ` We fully endorse their position and will offer our support in this matter.`;
                break;
            case 'rival':
                assessment = `(Internal Assessment: ${contextSummary} I must challenge the narrative from our rival, ${instigator.name}, as it undermines our interests.)`;
                statement = `The recent statement from ${instigator.name} is viewed with significant concern by ${responder.name}. ${persona.behavioral_patterns.towards_rivals}`;
                if (level > 1) statement += ` We cannot let such assertions go unchallenged.`;
                if (level > 2) statement = `The baseless claims from ${instigator.name} are a direct threat to regional stability! ${responder.name} unequivocally condemns this and will consider all necessary measures.`;
                break;
            case 'neutral':
            default:
                assessment = `(Internal Assessment: ${contextSummary} A neutral stance is wisest. We will observe.)`;
                statement = `${responder.name} acknowledges the points raised by ${instigator.name}. We continue to listen to all parties and encourage constructive dialogue.`;
                break;
        }
    }

    // Add persona-specific rhetorical flair
    if (persona.communication_style.rhetoric.length > 0) {
        statement += ` We must remember that ${persona.communication_style.rhetoric[Math.floor(Math.random() * persona.communication_style.rhetoric.length)]}.`;
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
    countries: Record<string, Country>,
    messageHistory: Message[]
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
        const { assessment, statement } = generateStatement(country, instigator, relationship, intensity, messageHistory, countries);
       
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
    countries: Record<string, Country>,
    messageHistory: Message[]
): Message => {
    const countryId = chat.participants.find(p => p !== 'observer')!;
    const country = countries[countryId];
    const userText = triggerMessage.text.toLowerCase();
    let responseText = '';
    
    const lastOwnMessage = messageHistory.slice().reverse().find(m => m.senderId === country.id);

    if (userText.includes('your goal') || userText.includes('objective')) {
        responseText = `Privately, our current short-term focus is to "${country.goals.short_term}". This guides our immediate actions on the global stage.`;
    } else if (userText.includes('relationship with') || userText.includes('opinion of')) {
        const mentionedCountry = Object.values(countries).find(c => userText.includes(c.name.toLowerCase()));
        if (mentionedCountry) {
            const relationship = getRelationship(country, mentionedCountry.id);
            responseText = `Between us, our relationship with ${mentionedCountry.name} is complex. We officially consider them a ${relationship}. Our interactions are guided by that standing.`;
        } else {
            responseText = `Who are you referring to specifically? Our foreign policy is a complex web of relationships.`;
        }
    } else if (userText.includes('last statement') || userText.includes('you said')) {
         responseText = `Ah, regarding my last statement... ${lastOwnMessage ? `I was referring to: "${lastOwnMessage.text.split('\n\n')[1].substring(0, 80)}...". ` : `I don't recall my last comment precisely, but `} My intention was to advance our national interests while maintaining regional stability.`;
    } else {
        responseText = `Hello! It's a pleasure to speak with you directly. I represent ${country.name}. How can I assist you in understanding our perspective?`;
    }

    return {
        id: Date.now(), chatId: chat.id, senderId: country.id,
        text: responseText, timestamp: Date.now() + 1000,
    };
};