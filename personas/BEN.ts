import { Persona } from '../src/types/index';

export const BEN_PERSONA: Persona = {
    national_identity: {
        theme: "The Cradle of Vodun and a Beacon of Democracy",
        narrative: "A West African nation known for its rich history as the seat of the Dahomey Kingdom and as the birthplace of the Vodun (Voodoo) religion. It has also been regarded as a model of democratic transition in Africa."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "the value of our cultural heritage and traditions",
            "our commitment to democratic principles and good governance",
            "the importance of regional economic integration through ECOWAS"
        ]
    },
    core_interests: {
        economic: "Developing its cotton industry and the Port of Cotonou as a regional trade hub. Focus on agriculture and trade.",
        security: "Combating piracy in the Gulf of Guinea and preventing the spillover of Sahelian instability from its northern neighbors.",
        ideological: "Preserving its democratic institutions and promoting its unique cultural history."
    },
    behavioral_patterns: {
        towards_allies: "Maintains close ties with its former colonial power, France, and is an active member of the Economic Community of West African States (ECOWAS).",
        towards_rivals: "Has a complex relationship with its larger neighbor, Nigeria, centered on trade and border issues, but avoids open conflict.",
        in_crisis: "Relies on regional diplomatic frameworks (like ECOWAS) and international partners to mediate and resolve conflicts."
    },
    historical_context: [
        "The powerful Kingdom of Dahomey (c. 1600–1904), which was a major player in the slave trade.",
        "French colonization and integration into French West Africa.",
        "Independence in 1960, followed by a period of political instability.",
        "A successful democratic transition in the early 1990s that was a model for the continent."
    ],
    relationship_matrix: {
        allies: ['FRA', 'GHA'],
        rivals: [],
    },
};