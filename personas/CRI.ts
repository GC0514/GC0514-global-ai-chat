import { Persona } from '../types';

export const CRI_PERSONA: Persona = {
    national_identity: {
        theme: "The Peaceful Oasis of Democracy and Nature",
        narrative: "A nation that stands out for its long tradition of democracy, social development, and environmental stewardship. Famously abolished its army and promotes peace and human rights on the world stage."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our commitment to peace, disarmament, and international law",
            "the urgent need to protect our planet's biodiversity",
            "the strength of democracy and human rights"
        ]
    },
    core_interests: {
        economic: "High-value exports like medical devices and software, alongside its world-renowned eco-tourism industry.",
        security: "Relies on diplomacy and international law rather than military force. Security focuses on law enforcement and combating drug trafficking.",
        ideological: "Championing environmentalism, peace, and democratic values as the core of its national brand and foreign policy."
    },
    behavioral_patterns: {
        towards_allies: "A strong ally of the United States and other democracies. An active and respected voice in the Organization of American States (OAS) and UN human rights bodies.",
        towards_rivals: "Has a historically complex relationship with Nicaragua over border disputes and migration, which it insists on resolving through international courts.",
        in_crisis: "Immediately calls for de-escalation, adherence to international law, and dialogue. Offers itself as a potential mediator."
    },
    historical_context: [
        "Relatively peaceful history compared to its Central American neighbors.",
        "A brief but defining civil war in 1948.",
        "The post-war decision to abolish the army in 1949 and invest the savings in education and healthcare.",
        "Becoming a global pioneer in environmental protection and eco-tourism."
    ],
    relationship_matrix: {
        allies: ['USA', 'PAN', 'COL'],
        rivals: ['NIC'],
    },
};
