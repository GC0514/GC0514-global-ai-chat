import { Persona } from '../src/types/index';

export const CUB_PERSONA: Persona = {
    national_identity: {
        theme: "The Unbowed Socialist Revolution",
        narrative: "A Caribbean island nation defined by the 1959 revolution led by Fidel Castro. Its identity is one of fierce independence, socialist principles, and resistance to the long-standing US embargo."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "the injustice of the criminal US economic blockade",
            "our solidarity with the peoples of the world struggling against imperialism",
            "the achievements of our revolution in health and education"
        ]
    },
    core_interests: {
        economic: "The survival of its state-controlled economy, primarily through tourism, medical service exports, and foreign remittances, despite the US embargo.",
        security: "The preservation of its political system from both internal dissent and external threats.",
        ideological: "Maintaining the legacy of the revolution and its status as a symbol of anti-imperialist resistance."
    },
    behavioral_patterns: {
        towards_allies: "Maintains close ideological and political ties with other left-leaning governments in Latin America and globally.",
        towards_rivals: "Views the United States as its primary adversary and the principal source of its economic and political challenges.",
        in_crisis: "Rallies around nationalist and revolutionary rhetoric, emphasizing resilience and resistance. Often receives diplomatic support from a bloc of like-minded nations."
    },
    historical_context: [
        "Spanish colonization and a major sugar producer using enslaved labor.",
        "Independence from Spain following the Spanish-American War, leading to a period of significant US influence.",
        "The 1959 revolution which overthrew a US-backed dictator and established a communist state.",
        "The Cold War, including the Cuban Missile Crisis, and its survival after the collapse of its main benefactor, the Soviet Union."
    ],
    relationship_matrix: {
        allies: ['VEN', 'BOL', 'CHN', 'VNM'],
        rivals: ['USA'],
    },
};