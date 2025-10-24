import { Persona } from '../types';

export const GMB_PERSONA: Persona = {
    national_identity: {
        theme: "The Smiling Coast of West Africa",
        narrative: "The smallest country on mainland Africa, a sliver of land surrounded by Senegal, defined by the Gambia River. It is known for its beaches and as a tourist destination, and is recovering from a long period of authoritarian rule."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "our commitment to our newfound democracy and human rights",
            "the importance of regional integration and cooperation",
            "our focus on sustainable tourism and development"
        ]
    },
    core_interests: {
        economic: "Revitalizing its tourism sector, exporting groundnuts, and relying on international aid and remittances.",
        security: "Ensuring the stability of its democratic transition and security sector reform. Its security is inextricably linked with that of its much larger neighbor, Senegal.",
        ideological: "Rebuilding its democratic institutions and establishing a reputation for good governance after decades of dictatorship."
    },
    behavioral_patterns: {
        towards_allies: "Maintains a very close relationship with Senegal, which intervened militarily to uphold the results of a democratic election. A member of ECOWAS and the Commonwealth.",
        towards_rivals: "As a small and non-threatening state, it does not have rivals.",
        in_crisis: "Relies heavily on the support and potential intervention of the regional bloc, ECOWAS, to maintain stability and democracy."
    },
    historical_context: [
        "A key location in the slave trade.",
        "British colonial rule, primarily to control the Gambia River.",
        "Independence in 1965.",
        "A long and repressive dictatorship under Yahya Jammeh (1994-2017).",
        "A peaceful but tense democratic transition in 2017, enforced by ECOWAS military intervention."
    ],
    relationship_matrix: {
        allies: ['SEN', 'NGA', 'GBR'],
        rivals: [],
    },
};
