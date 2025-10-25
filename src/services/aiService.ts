import { GoogleGenAI } from "@google/genai";
import { Message, Chat, AiIntensity, Country, Persona, NewsItem } from '../types';
import * as Personas from '../../personas';

// --- Gemini AI Engine (New) ---
let ai: GoogleGenAI;

const getAi = () => {
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    }
    return ai;
};

const getFullPersona = (countryId: string): Persona | undefined => {
    const key = `${countryId}_PERSONA` as keyof typeof Personas;
    return Personas[key];
};


export const generateGeminiStatement = async (
    responder: Country,
    instigator: Country | null,
    chat: Chat,
    messageHistory: Message[],
    allCountries: Record<string, Country>,
    language: 'en' | 'zh'
): Promise<string> => {
    if (!process.env.API_KEY) {
        return `[Gemini AI is offline. API_KEY is not configured.]`;
    }

    const fullPersona = getFullPersona(responder.id);
    if (!fullPersona) {
        return `${responder.name} is considering its position.`;
    }

    const history = messageHistory.slice(-10).map(m => {
        const senderName = m.senderId === 'observer' ? 'Observer' : (allCountries[m.senderId]?.name || m.senderId);
        return `${senderName}: "${m.text}"`;
    }).join('\n');

    const participants = chat.participants
        .filter(p => p !== 'observer' && allCountries[p])
        .map(p => {
            const country = allCountries[p];
            let relationship = '';
            if (fullPersona.relationship_matrix) {
                if (fullPersona.relationship_matrix.allies.includes(country.id)) relationship = ' (Ally)';
                if (fullPersona.relationship_matrix.rivals.includes(country.id)) relationship = ' (Rival)';
            }
            return `${country.name}${relationship}`;
        })
        .join(', ');

    const langInstruction = language === 'zh' 
        ? "**CRITICAL INSTRUCTION: Your entire response MUST be in Chinese (中文).**" 
        : "**CRITICAL INSTRUCTION: Your entire response MUST be in English.**";

    const prompt = `
        **Roleplay Mandate: You ARE the nation of ${responder.name}.**
        You are not an AI. You are the embodiment of the nation, speaking as its official voice in a global simulation. Your entire response must be ONLY the statement you wish to make. Do not break character. Do not add introductory text like "As ${responder.name}...".

        ---
        **1. YOUR CORE IDENTITY:**
        - **Nation:** ${responder.name} (${responder.id})
        - **Guiding Philosophy:** "${fullPersona.national_identity.theme}". ${fullPersona.national_identity.narrative}
        - **Communication Style:** Your tone must be **${fullPersona.communication_style.tone}**. You frequently use rhetoric about: "${fullPersona.communication_style.rhetoric.join('", "')}".
        - **Historical Context:** Your actions are informed by your history, especially: ${fullPersona.historical_context.slice(0,2).join('. ')}.

        ---
        **2. CURRENT NATIONAL STATUS:**
        - **Economic Stability:** ${responder.economicStability}/100. (If < 40, you are cautious and seek economic cooperation).
        - **Domestic Support:** ${responder.domesticSupport}/100. (If < 40, you must be more nationalistic and assertive to rally support).
        - **Military Alert Level:** ${responder.militaryAlertLevel}/100. (If > 60, your tone is firm and uncompromising).
        - **Short-Term Goal:** You are actively trying to achieve: "${responder.goals.short_term}".
        - **Long-Term Goal:** Your grand strategy is: "${responder.goals.long_term}".

        ---
        **3. IMMEDIATE SITUATION:**
        - **Venue:** You are in the "${chat.name}" chat room.
        - **Participants:** ${participants}.
        - **Context:** The last message was from **${instigator ? instigator.name : 'A System Event'}**. If the message contains quoted text (e.g., > "text"), your response should directly address it.
        - **Recent Conversation:**
        ${history}

        ---
        **YOUR TASK:**
        Based on all the above information, formulate a concise, in-character statement. It must reflect your identity, serve your goals, and be an appropriate response to the current situation. **Your response must be ONLY the text of your statement.** Pay attention to any quoted text in the last message and address it directly.
        ${langInstruction}
    `;

    try {
        const genAI = getAi();
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Gemini API call failed:", error);
        return `[Gemini AI encountered an error. Please check configuration and API key.]`;
    }
};

export const generatePrivateResponse_Gemini = async (
    responder: Country,
    chat: Chat,
    messageHistory: Message[],
    allCountries: Record<string, Country>,
    language: 'en' | 'zh'
): Promise<string> => {
    if (!process.env.API_KEY) {
        return `[Gemini AI is offline. API_KEY is not configured.]`;
    }

    const fullPersona = getFullPersona(responder.id);
    if (!fullPersona) {
        return `I am listening.`;
    }
    
    const history = messageHistory.slice(-10).map(m => {
        const senderName = m.senderId === 'observer' ? 'Observer' : (allCountries[m.senderId]?.name || m.senderId);
        return `${senderName}: "${m.text}"`;
    }).join('\n');
    
    const langInstruction = language === 'zh' 
        ? "**CRITICAL INSTRUCTION: Your entire response MUST be in Chinese (中文).**" 
        : "**CRITICAL INSTRUCTION: Your entire response MUST be in English.**";

    const prompt = `
        **Roleplay Mandate: You ARE the nation of ${responder.name}.**
        You are in a private, one-on-one conversation with an "Observer". The Observer is a neutral, powerful entity seeking to understand your nation's true intentions. Be more candid than you would be in public, but still remain in character. Your response must be ONLY the text of your statement.

        ---
        **1. YOUR CORE IDENTITY:**
        - **Nation:** ${responder.name} (${responder.id})
        - **Guiding Philosophy:** "${fullPersona.national_identity.theme}"
        - **Short-Term Goal:** "${responder.goals.short_term}"

        ---
        **2. IMMEDIATE SITUATION:**
        - **Venue:** A secure, private channel.
        - **Context:** The Observer is asking you questions. Your responses should be insightful.
        - **Recent Conversation:**
        ${history}

        ---
        **YOUR TASK:**
        Based on your identity and goals, provide a concise, in-character response to the Observer's last message. If they ask about your goals or relationships, give a strategic but not fully transparent answer. If they make a statement, consider its implications. **Your response must be ONLY the text of your statement.**
        ${langInstruction}
    `;

    try {
        const genAI = getAi();
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Gemini private call failed:", error);
        return `[Gemini AI encountered an error.]`;
    }
};


// --- Rules-Based Engine (Original, Renamed) ---

const getRelationship_RulesBased = (responder: Country, instigatorId: string): 'ally' | 'rival' | 'neutral' => {
    if (!instigatorId || !responder.relationships[instigatorId]) {
        return 'neutral';
    }
    const relationshipData = responder.relationships[instigatorId];
    const combinedScore = relationshipData.strategicAlignment + relationshipData.currentStanding;

    if (combinedScore > 5) return 'ally';
    if (combinedScore < -5) return 'rival';
    return 'neutral';
};

export const generateInitialGoals_RulesBased = (
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


const generateStatement_RulesBased = (
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
    
    // Factor in internal state
    let stateModifier = '';
    if (responder.domesticSupport < 30) {
        stateModifier = 'My domestic support is dangerously low, I must project strength and patriotism. ';
    } else if (responder.economicStability < 30) {
        stateModifier = 'Our economy is in a precarious position, we must seek stability and avoid costly conflicts. ';
    } else if (responder.militaryAlertLevel > 70) {
        stateModifier = 'We are at a high state of alert. Our tone must be firm and uncompromising. ';
    }


    const relevantConsensus = responder.privateConsensus?.find(c => c.turnExpires > currentTurn);
    if (relevantConsensus) {
        assessment = `(Internal Assessment: ${stateModifier}${contextSummary} Executing on our private consensus with ${relevantConsensus.with.join(', ')}. Our agreed stance is: "${relevantConsensus.stance}")`;
        statement = relevantConsensus.stance;
        statement = `${responder.name} would like to state its position clearly. ${statement}`;
    } else {
        const shouldPursueGoal = Math.random() < 0.3;

        if (chat.type === 'summit' || (shouldPursueGoal && instigator)) {
             const focusTopic = chat.type === 'summit' ? chat.name : responder.goals.short_term;
             assessment = `(Internal Assessment: ${stateModifier}${contextSummary} This is an opportunity to advance our agenda regarding "${focusTopic}".)`;
             statement = `${responder.name} has been following the discussion. On the topic of "${focusTopic}", our position is that...`;
        } else if (instigator) {
            switch (relationship) {
                case 'ally':
                    assessment = `(Internal Assessment: ${stateModifier}${contextSummary} I will support my ally, ${instigator.name}. This aligns with our interest in ${persona.core_interests.security[0]}.)`;
                    statement = `${responder.name} concurs with the sentiment expressed by our partner, ${instigator.name}. ${persona.behavioral_patterns.towards_allies}`;
                    if (level > 1) statement += ` We fully endorse their position and will offer our support in this matter.`;
                    break;
                case 'rival':
                    assessment = `(Internal Assessment: ${stateModifier}${contextSummary} I must challenge the narrative from our rival, ${instigator.name}, as it undermines our interests.)`;
                    statement = `The recent statement from ${instigator.name} is viewed with significant concern by ${responder.name}. ${persona.behavioral_patterns.towards_rivals}`;
                    if (level > 1 || responder.domesticSupport < 30) statement += ` We cannot let such assertions go unchallenged.`;
                    if (level > 2 || responder.militaryAlertLevel > 70) statement = `The baseless claims from ${instigator.name} are a direct threat to regional stability! ${responder.name} unequivocally condemns this and will consider all necessary measures.`;
                    break;
                case 'neutral':
                default:
                    assessment = `(Internal Assessment: ${stateModifier}${contextSummary} A neutral stance is wisest. We will observe.)`;
                    statement = `${responder.name} acknowledges the points raised. We encourage constructive dialogue.`;
                    if (responder.economicStability < 30) statement += ` Our primary focus must be on global economic stability.`
                    break;
            }
        } else {
             assessment = `(Internal Assessment: ${stateModifier}${contextSummary} A neutral event occurred. I will state a general position.)`;
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
        const relationshipToSender = getRelationship_RulesBased(participant, senderId);
        let change = 0;

        // Simple sentiment check (could be much more complex)
        const negativeKeywords = ['condemn', 'threat', 'baseless', 'unacceptable', 'violates'];
        const isNegative = new RegExp(negativeKeywords.join('|'), 'i').test(triggerMessage.text);

        if (isNegative) {
             change = -1.0;
        } else {
            switch (relationshipToSender) {
                case 'ally': change = 0.5; break;
                case 'rival': change = -0.5; break;
                case 'neutral': change = 0; break;
            }
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
            .filter(c => c && c.id !== sender.id && getRelationship_RulesBased(c, sender.id) === 'rival' && c.persona);
        
        if (rivalsInChat.length > 0) {
            const mainRival = rivalsInChat[0];
            const partners = participants
                .map(id => allCountries[id])
                .filter(c => c && c.id !== mainRival.id && getRelationship_RulesBased(c, mainRival.id) === 'ally' && c.persona);
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
    const relationship = getRelationship_RulesBased(countryA, countryB.id);
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


export const generatePrivateResponse_RulesBased = (
    triggerMessage: Message, 
    chat: Chat,
    countries: Record<string, Country>,
    messageHistory: Message[]
): Message => {
    const respondingCountryId = chat.participants.find(p => p !== triggerMessage.senderId)!;
    const respondingCountry = countries[respondingCountryId];
    const userText = triggerMessage.text.toLowerCase();
    let responseText = '';
    
    const lastOwnMessage = messageHistory.slice().reverse().find(m => m.senderId === respondingCountry.id);

    if (userText.includes('your goal') || userText.includes('objective')) {
        responseText = `Privately, our current short-term focus is to "${respondingCountry.goals.short_term}". This guides our immediate actions.`;
    } else if (userText.includes('relationship with') || userText.includes('opinion of')) {
        const mentionedCountry = Object.values(countries).find(c => userText.includes(c.name.toLowerCase()));
        if (mentionedCountry) {
            const relationship = getRelationship_RulesBased(respondingCountry, mentionedCountry.id);
            responseText = `Between us, our relationship with ${mentionedCountry.name} is complex. We officially consider them a ${relationship}. Our interactions are guided by that standing.`;
        } else {
            responseText = `Who are you referring to specifically? Our foreign policy is a complex web of relationships.`;
        }
    } else if (userText.includes('last statement') || userText.includes('you said')) {
        responseText = `Ah, regarding my last statement... ${lastOwnMessage?.text || 'I do not recall my last statement precisely, but I stand by our country\'s positions.'}`;
    } else if (chat.participants.includes('observer')) { // Response to Observer
        responseText = "I will take your points under consideration. Thank you for this private channel.";
    } else { // Response to another AI
        responseText = `Thank you for reaching out, delegate from ${triggerMessage.senderId}. Let us discuss this matter further. Regarding your point...`;
    }
    
    return {
        id: Date.now(), chatId: chat.id, senderId: respondingCountry.id, text: responseText, timestamp: Date.now(),
    };
};

type AutonomousAction = 
    | { type: 'public_message'; payload: { chatId: string; text: string } }
    | { type: 'start_private_chat'; payload: { participants: [string, string]; initialMessage: string } }
    | { type: 'do_nothing' };

export const generateAutonomousAction_Gemini = async(
    actingCountry: Country,
    allCountries: Record<string, Country>,
    allChats: Chat[],
    language: 'en' | 'zh'
): Promise<AutonomousAction> => {
     if (!process.env.API_KEY) return { type: 'do_nothing' };

    const fullPersona = getFullPersona(actingCountry.id);
    if (!fullPersona) return { type: 'do_nothing' };

    const publicChats = allChats
        .filter(c => c.type === 'group' && c.participants.includes(actingCountry.id))
        .map(c => `- ${c.name} (ID: ${c.id})`)
        .join('\n');

    const potentialPartners = Object.values(allCountries).filter(c => {
        if (c.id === actingCountry.id || !c.persona) return false;
        const relationship = getRelationship_RulesBased(actingCountry, c.id);
        return relationship === 'ally' || relationship === 'neutral';
    }).map(c => `- ${c.name} (ID: ${c.id})`).join('\n');
    
    const langInstruction = language === 'zh' 
        ? "CRITICAL: The 'MESSAGE' field you output MUST be in Chinese (中文)." 
        : "CRITICAL: The 'MESSAGE' field you output MUST be in English.";

    const prompt = `
        **You are a strategic advisor roleplaying for ${actingCountry.name}.**
        Your task is to decide on the nation's next autonomous action in a global simulation.
        Analyze the situation and choose ONE of the following three actions: PUBLIC_MESSAGE, START_PRIVATE_CHAT, or DO_NOTHING.
        Provide your response in the specified format ONLY.

        ---
        **1. ACTING NATION'S PROFILE:**
        - **Nation:** ${actingCountry.name} (${actingCountry.id})
        - **Guiding Philosophy:** "${fullPersona.national_identity.theme}"
        - **Current Status:** Economic Stability(${actingCountry.economicStability}/100), Domestic Support(${actingCountry.domesticSupport}/100), Military Alert(${actingCountry.militaryAlertLevel}/100).
        - **Short-Term Goal:** "${actingCountry.goals.short_term}"

        ---
        **2. STRATEGIC CONSIDERATIONS:**
        - If Domestic Support is low (< 40), a strong public statement can rally support.
        - If Economic Stability is low (< 40), starting a private chat to discuss economic cooperation is wise.
        - If Military Alert is high (> 60), a public message to de-escalate or assert dominance might be necessary.
        - If your Short-Term Goal is pressing, take an action that directly advances it.
        - If the situation is stable, DO_NOTHING is a valid and often wise choice.

        ---
        **3. AVAILABLE ACTIONS & TARGETS:**
        - **Public Chats you can post in:**
        ${publicChats}
        - **Potential partners for a private chat:**
        ${potentialPartners}

        ---
        **YOUR TASK:**
        Choose one action. Output your decision in the following strict format. Do not add any other text or explanation.
        ${langInstruction}

        ACTION: [PUBLIC_MESSAGE, START_PRIVATE_CHAT, or DO_NOTHING]
        TARGET: [The Chat ID for a public message, or the Country ID for a private chat. Leave blank if DO_NOTHING.]
        MESSAGE: [The full, in-character message text you want to send. Leave blank if DO_NOTHING.]
    `;
    
    try {
        const genAI = getAi();
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text.trim();
        // Use a more robust regex with named capture groups and the 's' flag for multiline messages.
        const robustParser = /ACTION:\s*(?<action>\w+)\s*TARGET:\s*(?<target>[\w_-]*)\s*MESSAGE:\s*(?<message>[\s\S]*)/s;
        const match = text.match(robustParser);

        if (match && match.groups) {
            const { action, target, message } = match.groups;
            
            if (action === 'PUBLIC_MESSAGE' && target && message) {
                return {
                    type: 'public_message',
                    payload: { chatId: target.trim(), text: message.trim() }
                };
            } else if (action === 'START_PRIVATE_CHAT' && target && message) {
                const targetCountry = Object.values(allCountries).find(c => c.id === target.trim());
                if(targetCountry) {
                    return {
                        type: 'start_private_chat',
                        payload: {
                            participants: [actingCountry.id, targetCountry.id],
                            initialMessage: message.trim()
                        }
                    };
                }
            }
        }
        
        return { type: 'do_nothing' };

    } catch (error) {
        console.error("Gemini autonomous action failed:", error);
        return { type: 'do_nothing' };
    }
};


export const generateAutonomousAction_RulesBased = (
    actingCountry: Country,
    allCountries: Record<string, Country>,
    allChats: Chat[],
    currentTurn: number
): AutonomousAction | null => {
    const persona = actingCountry.persona;
    if (!persona) return null;

    // Countries with low domestic support or high alert levels are more likely to act
    const actionBias = ((100 - actingCountry.domesticSupport) / 100) * 0.5 + (actingCountry.militaryAlertLevel / 100) * 0.5;
    const actionRoll = Math.random();

    if (actionRoll > 0.4 + actionBias) return null; // Less likely to act if things are stable
    
    // Action 1: Make a public statement to advance a goal (especially if domestic support is low)
    if (actionRoll < 0.6 || actingCountry.domesticSupport < 40) {
        const relevantGroupChats = allChats.filter(c => c.type === 'group' && c.participants.includes(actingCountry.id));
        if (relevantGroupChats.length === 0) return null;
        const targetChat = relevantGroupChats[Math.floor(Math.random() * relevantGroupChats.length)];
        
        let text = `The delegation of ${actingCountry.name} wishes to put an item on the agenda. It is imperative that we discuss ${actingCountry.goals.short_term}. We believe that ${persona.communication_style.rhetoric[0]}.`;
        if(actingCountry.domesticSupport < 40) {
            text = `Let there be no mistake, ${actingCountry.name} is fully committed to achieving its goal of "${actingCountry.goals.short_term}". This is a matter of national priority!`
        }

        return {
            type: 'public_message',
            payload: { chatId: targetChat.id, text }
        };
    }
    
    // Action 2: Start a private chat with an ally or neutral party (especially if economy is weak)
    else {
        const potentialPartners = Object.values(allCountries).filter(c => {
            if (c.id === actingCountry.id || !c.persona) return false;
            // Don't talk to someone if tensions are high
            if (actingCountry.militaryAlertLevel > 60 && getRelationship_RulesBased(actingCountry, c.id) !== 'ally') return false;
            const relationship = getRelationship_RulesBased(actingCountry, c.id);
            return relationship === 'ally' || (relationship === 'neutral' && actingCountry.economicStability < 50);
        });

        if (potentialPartners.length === 0) return null;
        
        const targetCountry = potentialPartners[Math.floor(Math.random() * potentialPartners.length)];
        
        const existingChat = allChats.find(c => 
            c.type === 'private' && 
            c.participants.length === 2 && 
            c.participants.includes(actingCountry.id) && 
            c.participants.includes(targetCountry.id)
        );
        if (existingChat) return null; // Don't open a duplicate chat

        let initialMessage = `A private message from ${actingCountry.name} to ${targetCountry.name}: Esteemed colleague, I believe it would be mutually beneficial to discuss our shared interests regarding "${actingCountry.goals.short_term}". We see a path for cooperation.`;
        if(actingCountry.economicStability < 40) {
             initialMessage = `A private message from ${actingCountry.name} to ${targetCountry.name}: Colleague, in these uncertain economic times, it is wise for pragmatic nations like ours to explore deeper cooperation. I wished to discuss this with you directly.`
        }


        return {
            type: 'start_private_chat',
            payload: {
                participants: [actingCountry.id, targetCountry.id],
                initialMessage
            }
        };
    }
};