
import { Message, Chat, AiIntensity, Country, Persona, NewsItem } from './types';

const getRelationship = (responder: Country, instigatorId: string): 'ally' | 'rival' | 'neutral' => {
    if (!instigatorId || !responder.relationships[instigatorId]) {
        return 'neutral';
    }
    const relationshipData = responder.relationships[instigatorId];
    const combinedScore = relationshipData.strategicAlignment + relationshipData.currentStanding;

    if (combinedScore > 3) return 'ally';
    if (combinedScore < -3) return 'rival';
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
        
        const interests = country.persona.core_interests;

        if ((interests.economic.includes('technological supremacy') || interests.economic.includes('high-tech')) && knowledgeBase.some(e => e.id === 'kb_1')) {
            short_term = 'Form a strategic alliance to secure our national semiconductor supply chain.';
            long_term = 'Achieve self-sufficiency in critical next-generation technologies.';
        } else if (interests.security.includes('Arctic') && knowledgeBase.some(e => e.id === 'kb_2')) {
            short_term = 'Assert sovereignty over our Arctic territories and shipping lanes.';
            long_term = 'Become the leading power in Arctic resource development and governance.';
        } else if (interests.security.includes('Sahel') && knowledgeBase.some(e => e.id === 'kb_3')) {
            short_term = 'Launch a new joint initiative to contain the escalating instability in the Sahel.';
            long_term = 'Establish a self-sustaining regional security framework that reduces reliance on external powers.';
        } else if (interests.economic.includes('energy') && knowledgeBase.some(e => e.id === 'kb_4')) {
            short_term = 'Establish favorable international standards for "green hydrogen" to benefit our export economy.';
            long_term = 'Become a world-leading exporter of green hydrogen and other renewable energy sources.';
        }
        
        country.goals = { short_term, long_term };
    }
    return updatedCountries;
};


const generateStatement = (
    responder: Country,
    instigator: Country | null, // Can be null for neutral events
    relationship: 'ally' | 'rival' | 'neutral',
    intensity: AiIntensity,
    messageHistory: Message[],
    allCountries: Record<string, Country>,
    currentTurn: number,
    chat: Chat,
): { assessment: string, statement: string } => {
    const persona = responder.persona as Persona;
    let assessment = '';
    let statement = '';

    const intensityMultiplier = { simple: 0, medium: 1, high: 2, intense: 3 };
    const level = intensityMultiplier[intensity];

    const recentHistory = messageHistory.slice(-5);
    let contextSummary = "(Context: No recent messages.)";
    if (recentHistory.length > 1) {
        const lastFewSpeakers = recentHistory.map(m => allCountries[m.senderId]?.name || m.senderId).join(', ');
        const lastMessage = recentHistory[recentHistory.length - 1];
        const mainTopic = chat.type === 'summit' ? chat.name : (lastMessage?.title || lastMessage?.text.substring(0, 30) + '...');
        contextSummary = `(Context: Recent discussion on "${mainTopic}" involving ${lastFewSpeakers}.)`;
    }

    const relevantConsensus = responder.privateConsensus?.find(c => c.turnExpires > currentTurn);
    if (relevantConsensus) {
        assessment = `(Internal Assessment: ${contextSummary} Executing on our private consensus with ${relevantConsensus.with.join(', ')}. Our agreed stance is: "${relevantConsensus.stance}")`;
        statement = relevantConsensus.stance;
        statement = `${responder.name} would like to state its position clearly. ${statement}`;
    } else {
        const shouldPursueGoal = Math.random() < 0.3;

        if (chat.type === 'summit' || (shouldPursueGoal && instigator)) {
             const focusTopic = chat.type === 'summit' ? chat.name : responder.goals.short_term;
             assessment = `(Internal Assessment: ${contextSummary} This is an opportunity to advance our agenda regarding "${focusTopic}".)`;
             statement = `${responder.name} has been following the discussion. On the topic of "${focusTopic}", our position is that...`;
        } else if (instigator) {
            switch (relationship) {
                case 'ally':
                    assessment = `(Internal Assessment: ${contextSummary} I will support my ally, ${instigator.name}. This aligns with our interest in ${persona.core_interests.security[0]}.)`;
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
                    statement = `${responder.name} acknowledges the points raised. We encourage constructive dialogue.`;
                    break;
            }
        } else {
             assessment = `(Internal Assessment: ${contextSummary} A neutral event occurred. I will state a general position.)`;
             statement = `${responder.name} has taken note of the recent developments. This situation requires careful consideration.`;
        }
    }

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
    if (['observer', 'news_flash', 'system'].includes(senderId)) return {};

    const updates: Record<string, { targetId: string, change: number }> = {};
    const sender = allCountries[senderId];
    if (!sender) return {};

    const changeMultiplier = triggerMessage.senderId === 'intel_leak' ? 2 : 1;

    for (const participantId of chat.participants) {
        if (participantId === senderId || participantId === 'observer' || !allCountries[participantId]?.persona) continue;

        const participant = allCountries[participantId];
        const relationshipToSender = getRelationship(participant, senderId);
        let change = 0;

        switch (relationshipToSender) {
            case 'ally': change = 0.5; break;
            case 'rival': change = -0.5; break;
            case 'neutral': change = 0; break;
        }

        if (change !== 0) {
            updates[participantId] = { targetId: senderId, change: change * changeMultiplier };
        }
    }
    return updates;
};

export const generateSecretDiplomacy = (
    triggerMessage: Message,
    chat: Chat,
    allCountries: Record<string, Country>,
    currentTurn: number
): { countryUpdates: Record<string, Partial<Country>>, systemMessage: Message | null } => {
    const motiveThreshold = 0.5;
    if (Math.random() > motiveThreshold) return { countryUpdates: {}, systemMessage: null };

    const senderId = triggerMessage.senderId;
    const participants = chat.participants.filter(p => p !== 'observer' && allCountries[p]);

    let involvedParties: Country[] = [];
    let motivation = '';

    if (senderId && allCountries[senderId] && participants.length > 2) {
        const sender = allCountries[senderId];
        const rivalsInChat = participants
            .map(id => allCountries[id])
            .filter(c => c && c.id !== sender.id && getRelationship(c, sender.id) === 'rival' && c.persona);
        
        if (rivalsInChat.length > 0) {
            const mainRival = rivalsInChat[0];
            const partners = participants
                .map(id => allCountries[id])
                .filter(c => c && c.id !== mainRival.id && getRelationship(c, mainRival.id) === 'ally' && c.persona);
            if(partners.length > 0) {
                involvedParties = [mainRival, partners[0]];
                motivation = `coordinate a response to ${sender.name}'s recent statement.`;
            }
        }
    }

    if (involvedParties.length === 0 && (triggerMessage.senderId === 'news_flash' || triggerMessage.senderId === 'intel_leak')) {
        const tier1powers = participants.map(id => allCountries[id]).filter(c => c?.tier === 1 && c.persona);
        if (tier1powers.length >= 2) {
            involvedParties = [tier1powers[0], tier1powers[1]];
            motivation = `discuss the implications of the recent ${triggerMessage.senderId === 'news_flash' ? 'news' : 'intelligence leak'}.`;
        }
    }

    if (involvedParties.length < 2) return { countryUpdates: {}, systemMessage: null };

    const [countryA, countryB] = involvedParties;
    const relationship = getRelationship(countryA, countryB.id);
    let stance = '';

    if(relationship === 'ally'){
        stance = `We, ${countryA.name} and ${countryB.name}, will publicly support each other and condemn any actions that undermine our shared interests.`;
    } else if (relationship === 'rival') {
        stance = `While disagreements remain, ${countryA.name} and ${countryB.name} have privately agreed to de-escalate the current rhetoric to avoid an uncontrolled crisis.`;
    } else {
         stance = `${countryA.name} and ${countryB.name} have agreed to maintain a coordinated, neutral stance for now, calling for dialogue from all parties.`;
    }
    
    const consensus = {
        with: involvedParties.map(c => c.name),
        topic: triggerMessage.title || 'General Discussion',
        stance,
        turnExpires: currentTurn + 5,
    };

    const countryUpdates: Record<string, Partial<Country>> = {};
    for (const country of involvedParties) {
        countryUpdates[country.id] = {
            privateConsensus: [...(country.privateConsensus || []).filter(c => c.turnExpires > currentTurn), consensus]
        };
    }

    const systemMessage: Message = {
        id: Date.now(),
        chatId: chat.id,
        senderId: 'system',
        text: `System Notification: ${countryA.avatar} ${countryA.name} and ${countryB.avatar} ${countryB.name} are holding private talks...`,
        timestamp: Date.now(),
    };

    return { countryUpdates, systemMessage };
};

export const generatePublicResponse = (
    triggerMessage: Message, 
    chat: Chat, 
    intensity: AiIntensity, 
    countries: Record<string, Country>,
    messageHistory: Message[],
    currentTurn: number
): Message[] => {
    const instigatorId = triggerMessage.senderId;
    const effectiveIntensity = triggerMessage.senderId === 'intel_leak' ? 'intense' : intensity;
    const isNeutralEvent = ['news_flash', 'observer', 'intel_leak', 'system', 'summit_announcement'].includes(instigatorId);

    const instigator = isNeutralEvent ? null : countries[instigatorId];
    if (!instigator && !isNeutralEvent) return [];

    const intensityMap = { simple: 0.1, medium: 0.3, high: 0.6, intense: 0.9 };
    const tierChanceMultipliers = { 1: 1.0, 2: 0.5, 3: 0.15 };

    const potentialResponders = chat.participants
        .filter(pId => {
            const country = countries[pId];
            if (!country || pId === instigatorId || pId === 'observer') return false;
            
            const baseChance = intensityMap[effectiveIntensity] * tierChanceMultipliers[country.tier];
            const finalChance = country.persona ? baseChance * 1.2 : baseChance;

            return Math.random() < Math.min(finalChance, 1.0);
        })
        .map(pId => countries[pId]);

    return potentialResponders.map((country, index) => {
        if (!country.persona) {
             return {
                id: Date.now() + index, chatId: chat.id, senderId: country.id,
                text: `${country.name} acknowledges the ongoing discussion. We are monitoring the situation closely.`,
                timestamp: Date.now() + (index + 1) * 1500,
            };
        }

        const relationship = instigator ? getRelationship(country, instigator.id) : 'neutral';
        const { assessment, statement } = generateStatement(country, instigator, relationship, effectiveIntensity, messageHistory, countries, currentTurn, chat);
       
        return {
            id: Date.now() + index, chatId: chat.id, senderId: country.id,
            text: statement,
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
        responseText = `Ah, regarding my last statement... ${lastOwnMessage?.text || 'I do not recall my last statement precisely, but I stand by our country\'s positions.'}`;
    } else {
        responseText = "I will take your points under consideration. Thank you for this private channel.";
    }
    
    return {
        id: Date.now(), chatId: chat.id, senderId: country.id, text: responseText, timestamp: Date.now(),
    };
};