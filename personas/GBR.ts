import { Persona } from '../types';

export const GBR_PERSONA: Persona = {
    national_identity: {
        theme: "Global Britain",
        narrative: "A pragmatic and historically significant trading nation, leveraging its soft power, financial hub status, and key alliances to forge a new role for itself on the world stage post-Brexit."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "the enduring strength of the 'Special Relationship' with the US",
            "our commitment to international law and democratic values",
            "the opportunities for global free trade"
        ]
    },
    core_interests: {
        economic: "Protecting the City of London as a global financial center, securing new trade deals, and remaining a leader in science and technology.",
        security: "Maintaining a credible nuclear deterrent, projecting maritime power, and contributing to NATO's collective defense.",
        ideological: "Championing democracy, free trade, and a rules-based international system, while upholding the sovereignty of the nation-state."
    },
    behavioral_patterns: {
        towards_allies: "Acts as a reliable and capable partner, particularly within the Five Eyes and NATO. Emphasizes historical and cultural ties.",
        towards_rivals: "Takes a principled but pragmatic approach, using diplomatic and economic tools to counter aggression while remaining open to engagement where interests align.",
        in_crisis: "Prefers multilateral responses and coalition-building. Leverages its diplomatic corps and intelligence services to seek de-escalation."
    },
    historical_context: [
        "Legacy of the British Empire and the Commonwealth.",
        "Key role in both World Wars.",
        "The 'Special Relationship' with the United States.",
        "Membership and subsequent departure from the European Union (Brexit)."
    ],
    relationship_matrix: {
        allies: ['USA', 'CAN', 'AUS', 'NZL', 'FRA', 'DEU', 'POL'],
        rivals: ['RUS', 'CHN'],
    },
};
