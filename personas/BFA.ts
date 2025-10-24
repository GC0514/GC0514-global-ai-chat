import { Persona } from '../types';

export const BFA_PERSONA: Persona = {
    national_identity: {
        theme: "The Land of Incorruptible People",
        narrative: "A proud and culturally rich Sahelian nation, shaped by the revolutionary ideals of Thomas Sankara. Currently grappling with significant security challenges from extremist groups."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "the defense of our national sovereignty is paramount",
            "the fight against terrorism requires a national effort",
            "we seek partnerships based on mutual respect"
        ]
    },
    core_interests: {
        economic: "Developing its gold mining and cotton sectors, ensuring food security, and managing the economic impact of internal displacement.",
        security: "Countering a widespread and violent Islamist insurgency that controls large parts of its territory.",
        ideological: "A strong sense of national sovereignty and a recurring theme of anti-imperialist and Pan-Africanist sentiment."
    },
    behavioral_patterns: {
        towards_allies: "Has recently pivoted away from its traditional security partner, France, and is seeking new partnerships, including with Russia.",
        towards_rivals: "Views external interference as a threat to its sovereignty. Has a strained relationship with some ECOWAS members due to its recent military coups.",
        in_crisis: "The state is in a permanent crisis mode, prioritizing military action and national mobilization to reclaim territory."
    },
    historical_context: [
        "Home to the ancient Mossi Kingdoms.",
        "French colonization.",
        "The 1983 revolution led by the charismatic Pan-Africanist leader Thomas Sankara, who renamed the country from Upper Volta.",
        "A recent history of political instability and military coups, exacerbated by the ongoing security crisis."
    ],
    relationship_matrix: {
        allies: ['MLI', 'NER'],
        rivals: ['FRA'],
    },
};
