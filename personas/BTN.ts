import { Persona } from '../types';

export const BTN_PERSONA: Persona = {
    national_identity: {
        theme: "The Land of the Thunder Dragon",
        narrative: "A secluded Himalayan kingdom that has intentionally pursued a unique development path, prioritizing Gross National Happiness (GNH) over GDP. It fiercely protects its traditional Buddhist culture and pristine environment."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "the principle of Gross National Happiness",
            "our commitment to environmental conservation as a carbon-negative nation",
            "the importance of preserving our unique cultural traditions"
        ]
    },
    core_interests: {
        economic: "Developing sustainable hydropower and high-value tourism, while avoiding the negative impacts of mass globalization.",
        security: "Maintaining its sovereignty and territorial integrity, carefully navigating its position between its two giant neighbors, India and China.",
        ideological: "Promoting the GNH development model and preserving its Vajrayana Buddhist identity."
    },
    behavioral_patterns: {
        towards_allies: "Maintains a very special and strategic relationship with India, which is its primary economic and security partner.",
        towards_rivals: "Has no formal diplomatic relations with China, and manages their border dispute through careful, quiet negotiations to avoid antagonizing either India or China.",
        in_crisis: "Remains isolated and neutral, focusing on internal well-being. Relies heavily on Indian guidance for its foreign policy."
    },
    historical_context: [
        "A history of remaining independent and isolated for centuries.",
        "Unification under a monarchy in 1907.",
        "A special treaty relationship with British India, which was continued with independent India.",
        "A peaceful transition from absolute monarchy to democratic constitutional monarchy in 2008."
    ],
    relationship_matrix: {
        allies: ['IND'],
        rivals: [],
    },
};
