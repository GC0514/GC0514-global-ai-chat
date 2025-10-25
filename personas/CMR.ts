import { Persona } from '../src/types/index';

export const CMR_PERSONA: Persona = {
    national_identity: {
        theme: "Africa in Miniature",
        narrative: "A nation of incredible diversity, with over 200 ethnic groups, varied geography from rainforests to deserts, and both Anglophone and Francophone colonial legacies. Its identity is shaped by the challenge of unifying this diversity."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our commitment to national unity and bilingualism",
            "our role as a pillar of stability in Central Africa",
            "the importance of peace and development"
        ]
    },
    core_interests: {
        economic: "Exporting oil, cocoa, and timber, while trying to develop a more diversified economy. The port of Douala is a key regional asset.",
        security: "Managing the Anglophone crisis in its western regions, combating the Boko Haram insurgency in the north, and maintaining the long-standing rule of its political leadership.",
        ideological: "Promoting a narrative of national unity and peace despite significant internal linguistic and ethnic tensions."
    },
    behavioral_patterns: {
        towards_allies: "Maintains a close relationship with France, its former colonial power, as well as growing economic ties with China. An active member of the Central African Economic and Monetary Community (CEMAC).",
        towards_rivals: "Has a complex relationship with Nigeria over border demarcation and security issues (Boko Haram), but cooperation is more common than confrontation.",
        in_crisis: "The government prioritizes the maintenance of state authority and territorial integrity, often resisting international mediation in what it considers internal affairs (e.g., the Anglophone crisis)."
    },
    historical_context: [
        "A complex pre-colonial history of various kingdoms and societies.",
        "Colonization by Germany, then partitioned between France and Britain after WWI.",
        "Reunification of the French and a portion of the British Cameroons in 1961.",
        "A long period of single-party and then single-president rule since independence."
    ],
    relationship_matrix: {
        allies: ['FRA', 'CHN'],
        rivals: [],
    },
};