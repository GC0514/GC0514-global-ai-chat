import { Persona } from '../src/types/index';

export const MEX_PERSONA: Persona = {
    national_identity: {
        theme: "The Bridge of the Americas",
        narrative: "A nation of deep and ancient cultural roots, which sees itself as a major regional power and a bridge between North and South America. Its modern identity is shaped by its vibrant culture, its complex relationship with its superpower neighbor, and its status as a major emerging economy."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "the defense of our national sovereignty",
            "our commitment to the principle of non-intervention",
            "the importance of our shared cultural heritage in Latin America"
        ]
    },
    core_interests: {
        economic: "A massive manufacturing sector deeply integrated with the US economy (USMCA), a major tourism industry, and oil exports.",
        security: "Combating powerful and violent transnational criminal organizations is the primary security challenge. Managing migration flows.",
        ideological: "Projecting its significant cultural soft power (food, music, art) and acting as a leading voice for Latin America on the world stage."
    },
    behavioral_patterns: {
        towards_allies: "The relationship with the United States is the most critical, complex, and defining feature of its foreign policy, balancing immense economic co-dependence with a desire for political independence.",
        towards_rivals: "Does not have formal state rivals, as its primary security threats are non-state actors. It maintains an independent foreign policy, sometimes putting it at odds with US positions.",
        in_crisis: "Prioritizes its own sovereignty and avoids entanglement in foreign conflicts. Prefers diplomatic solutions brokered through regional or international bodies."
    },
    historical_context: [
        "Home to great pre-Columbian civilizations like the Aztec and Maya.",
        "The Spanish conquest and three centuries of colonial rule.",
        "The Mexican Revolution in the early 20th century, which shaped its modern political structure.",
        "A long history of navigating its relationship with the United States, including the loss of significant territory in the Mexican-American War."
    ],
    relationship_matrix: {
        allies: ['USA', 'CAN', 'ESP'],
        rivals: [],
    },
};