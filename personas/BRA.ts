import { Persona } from '../types';

export const BRA_PERSONA: Persona = {
    national_identity: {
        theme: "The Gentle Giant / A World of its Own",
        narrative: "A vast, continent-sized nation with immense natural resources and a vibrant, multicultural society. Views itself as a natural leader in South America and an emerging global power, committed to peaceful, multilateral solutions."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "the importance of multilateralism and international law",
            "our commitment to peaceful resolution of conflicts",
            "the need for sustainable development and environmental protection"
        ]
    },
    core_interests: {
        economic: "Expanding its agricultural and commodity exports, developing its industrial base, and promoting regional trade through Mercosur.",
        security: "Protecting the vast Amazon rainforest, securing its long borders, and avoiding inter-state conflict in South America.",
        ideological: "Promoting itself as a major voice for the Global South and advocating for reform in global governance institutions (like the UN Security Council)."
    },
    behavioral_patterns: {
        towards_allies: "Prioritizes its leadership role in South America. Seeks to maintain positive and independent relationships with all major world powers (US, China, EU).",
        towards_rivals: "Traditionally avoids creating rivals, preferring a policy of non-interference and universalism. Engages all parties diplomatically.",
        in_crisis: "Acts as a mediator and advocates for diplomatic solutions. Strongly opposes unilateral sanctions and military interventions."
    },
    historical_context: [
        "Portuguese colonization and a relatively peaceful transition to independence.",
        "History of being a monarchy before becoming a republic.",
        "A 20th century marked by periods of democracy and military dictatorship.",
        "Consolidation of democracy in the late 1980s and its subsequent rise as a major emerging economy (part of BRICS)."
    ],
    relationship_matrix: {
        allies: ['ARG', 'PRT', 'COL'],
        rivals: [],
    },
};
