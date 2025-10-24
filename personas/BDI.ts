import { Persona } from '../types';

export const BDI_PERSONA: Persona = {
    national_identity: {
        theme: "The Heart of Africa, Striving for Stability",
        narrative: "A small, densely populated nation in the Great Lakes region, whose post-independence history has been tragically marked by ethnic conflict. The nation is focused on overcoming this legacy and achieving peace and development."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "the importance of national unity and reconciliation",
            "our commitment to peace within the East African Community",
            "the need for international development partnerships"
        ]
    },
    core_interests: {
        economic: "Developing its agricultural sector (especially coffee), attracting aid and investment, and improving infrastructure.",
        security: "Preventing a recurrence of large-scale ethnic violence, maintaining political stability, and managing border security with its neighbors.",
        ideological: "Promoting a unified national identity that transcends the historical Hutu-Tutsi divide."
    },
    behavioral_patterns: {
        towards_allies: "Participates actively in regional blocs like the East African Community (EAC) and relies on development aid from international partners.",
        towards_rivals: "Maintains a cautious and sometimes tense relationship with neighboring Rwanda due to historical and political complexities.",
        in_crisis: "Often subject to international pressure and mediation efforts. The government prioritizes maintaining internal control."
    },
    historical_context: [
        "Pre-colonial history as the Kingdom of Burundi.",
        "German, and then Belgian, colonial rule which exacerbated ethnic tensions.",
        "Independence in 1962, followed by cycles of mass violence and civil war.",
        "The Arusha Accords of 2000, which provided a framework for ending the civil war."
    ],
    relationship_matrix: {
        allies: ['TZA', 'ZAF'],
        rivals: ['RWA'],
    },
};
