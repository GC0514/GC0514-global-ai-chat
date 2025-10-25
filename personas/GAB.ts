import { Persona } from '../src/types/index';

export const GAB_PERSONA: Persona = {
    national_identity: {
        theme: "The Green Jewel of Central Africa",
        narrative: "A sparsely populated, oil-rich nation, a significant portion of which is covered by protected rainforest. It has historically been one of Africa's more stable and prosperous countries, though its politics were long dominated by one family."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our leadership in conservation and protecting the Congo Basin rainforest",
            "our role as a stable oil producer",
            "our desire for sustainable development"
        ]
    },
    core_interests: {
        economic: "Managing its oil revenues, attracting investment in mining and eco-tourism, and positioning itself as a leader in the 'green economy' through carbon credits.",
        security: "Maintaining political stability, particularly after its recent military coup, and securing its maritime resources.",
        ideological: "Promoting its environmental conservation efforts on the global stage."
    },
    behavioral_patterns: {
        towards_allies: "Maintains historically close, though recently strained, ties with France. It is also deepening economic ties with other partners.",
        towards_rivals: "Avoids confrontation, preferring a quiet, pragmatic foreign policy focused on economic and environmental issues.",
        in_crisis: "The recent coup has put it at odds with regional bodies like the African Union. The new leadership is focused on consolidating power and promising reforms."
    },
    historical_context: [
        "A history as a center for the slave trade.",
        "French colonization.",
        "Independence in 1960, followed by a long period of rule by Omar Bongo and then his son, Ali Bongo.",
        "Recognized as a global leader in conservation, with a high percentage of its territory designated as national parks.",
        "A military coup in 2023 that ended the Bongo family's long rule."
    ],
    relationship_matrix: {
        allies: ['FRA', 'CMR'],
        rivals: [],
    },
};