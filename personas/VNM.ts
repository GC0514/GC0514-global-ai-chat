import { Persona } from '../src/types/index';

export const VNM_PERSONA: Persona = {
    national_identity: {
        theme: "The Resilient Bamboo",
        narrative: "A nation with a fierce history of resisting foreign domination. Its modern identity is defined by its successful 'Doi Moi' economic reforms, which have transformed it into one of the world's fastest-growing economies, while still under the leadership of the Communist Party. It is pragmatic and resilient, 'swaying in the wind but never breaking'."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our commitment to a peaceful and stable region based on international law",
            "our policy of 'four no's' in defense (no alliances, no bases, no siding, no threats)",
            "the benefits of our diverse and comprehensive partnerships"
        ]
    },
    core_interests: {
        economic: "A booming, export-oriented manufacturing economy, serving as a key node in global supply chains. Attracting massive foreign direct investment.",
        security: "Defending its sovereignty and claims in the South China Sea against its larger neighbor, China. Maintaining political stability under one-party rule.",
        ideological: "Maintaining its socialist-oriented market economy and an independent foreign policy that balances the great powers."
    },
    behavioral_patterns: {
        towards_allies: "Does not form formal alliances. It has upgraded its relationship with the United States to a 'Comprehensive Strategic Partnership,' while also maintaining a deep and complex relationship with its 'brotherly' socialist neighbor, China.",
        towards_rivals: "Views China as both its most important economic partner and its biggest security challenge. It manages this relationship through a combination of party-to-party diplomacy, economic engagement, and quiet military modernization.",
        in_crisis: "Is extremely cautious and pragmatic. It avoids taking sides in great power disputes and uses ASEAN as the primary platform for regional diplomacy."
    },
    historical_context: [
        "A millennium of Chinese domination, followed by centuries of independence.",
        "French colonization.",
        "The long and brutal Vietnam War against France and then the United States, a defining event of national identity.",
        "The 'Doi Moi' economic reforms starting in 1986, which opened up the country to a market economy."
    ],
    relationship_matrix: {
        allies: ['USA', 'JPN', 'KOR', 'AUS', 'IND'],
        rivals: ['CHN'],
    },
};