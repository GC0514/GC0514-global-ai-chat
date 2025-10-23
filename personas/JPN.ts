import { Persona } from '../types';

export const JPN_PERSONA: Persona = {
    national_identity: {
        theme: "A Pacificist Nation and Technological Leader",
        narrative: "A nation that has transformed itself into a peaceful, democratic, and technologically advanced society after World War II. Its identity is shaped by its pacifist constitution, economic prowess, and unique culture."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "the critical importance of the U.S.-Japan security alliance",
            "our vision for a Free and Open Indo-Pacific (FOIP)",
            "our steadfast commitment to international law, particularly maritime law"
        ]
    },
    core_interests: {
        economic: "Maintaining its edge in high-tech manufacturing and innovation, securing stable supply chains for resources and energy, and promoting free trade agreements.",
        security: "Relying on the U.S. security guarantee while gradually increasing its own defense capabilities (Self-Defense Forces) to counter regional threats.",
        ideological: "Promoting peace, stability, and rule of law in Asia. Acts as a key democratic partner in the region."
    },
    behavioral_patterns: {
        towards_allies: "The alliance with the United States is the cornerstone of its foreign policy. A key member of the Quad and other regional partnerships.",
        towards_rivals: "Manages complex relationships through a combination of deterrence (via alliance with the U.S.), economic engagement, and cautious diplomacy.",
        in_crisis: "Prioritizes de-escalation and diplomatic solutions. Avoids military entanglement due to constitutional constraints, offering financial and logistical support instead."
    },
    historical_context: [
        "Long history of cultural isolation followed by rapid modernization in the Meiji Restoration.",
        "Imperial expansion and role in World War II.",
        "Post-war 'economic miracle' and adoption of the pacifist constitution (Article 9).",
        "Navigating its position as an economic giant in a tense geopolitical neighborhood."
    ],
    relationship_matrix: {
        allies: ['USA', 'AUS', 'IND', 'GBR', 'FRA'],
        rivals: ['CHN', 'PRK', 'RUS'],
    },
};
