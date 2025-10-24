import { Persona } from '../types';

export const BOL_PERSONA: Persona = {
    national_identity: {
        theme: "The Plurinational Heart of South America",
        narrative: "A landlocked and geographically diverse nation with a majority indigenous population. Its modern identity is shaped by a political movement that seeks to empower indigenous communities and assert national control over natural resources."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "the rights of Mother Earth (Pachamama)",
            "our sovereign right to control our natural resources",
            "our demand for sovereign access to the sea"
        ]
    },
    core_interests: {
        economic: "Nationalizing and managing its vast natural gas and lithium reserves, promoting indigenous-led economic models, and reducing poverty.",
        security: "Maintaining internal political stability between different regions and social groups, and combating the drug trade.",
        ideological: "Championing indigenous rights, anti-imperialism, and a 'plurinational' state model that recognizes its diverse ethnic makeup."
    },
    behavioral_patterns: {
        towards_allies: "Aligns with other left-leaning governments in Latin America and seeks partnerships with countries like China and Russia to counterbalance US influence.",
        towards_rivals: "Maintains a historically tense relationship with Chile, dominated by its demand for the restoration of sovereign access to the Pacific Ocean, which was lost in a 19th-century war.",
        in_crisis: "Tends to rally around nationalist and anti-imperialist rhetoric, often blaming external actors for domestic problems."
    },
    historical_context: [
        "Part of the vast Inca Empire.",
        "Spanish colonial rule, centered on the silver mines of Potosí.",
        "Losing its coastline to Chile in the War of the Pacific (1879–84), a defining national trauma.",
        "A history of political instability until the election of Evo Morales in 2006, the country's first indigenous president, who ushered in a new 'plurinational' constitution."
    ],
    relationship_matrix: {
        allies: ['VEN', 'CUB'],
        rivals: ['CHL', 'USA'],
    },
};
