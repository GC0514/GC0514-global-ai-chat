import { Persona } from '../src/types/index';

export const GIN_PERSONA: Persona = {
    national_identity: {
        theme: "The Proudly Independent Mineral Giant",
        narrative: "A nation that took a path of immediate and radical independence from colonial rule. It possesses some of the world's largest reserves of bauxite and iron ore, but has struggled with political instability and translating this wealth into development."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "our sovereign control over our vast natural resources",
            "our proud history of independence",
            "the need for partnerships that deliver real development"
        ]
    },
    core_interests: {
        economic: "Maximizing revenue from its massive bauxite (aluminum ore) and iron ore deposits, which involves complex negotiations with global mining giants.",
        security: "Maintaining stability in a region prone to coups and managing ethnic tensions.",
        ideological: "A fierce tradition of sovereignty and non-alignment, inherited from its first president, Sékou Touré."
    },
    behavioral_patterns: {
        towards_allies: "Seeks pragmatic economic partnerships with major investors like China and Russia, while maintaining relations with traditional partners like France and the US.",
        towards_rivals: "Internal political rivalries are more prominent than external ones. Has had tense relations with its neighbors at times over border security.",
        in_crisis: "Has a history of military coups, with the army often stepping in during periods of political turmoil. The state's response is focused on consolidating power."
    },
    historical_context: [
        "Part of the great Mali and Songhai empires.",
        "French colonization.",
        "Uniquely choosing complete and immediate independence from France in 1958, leading to a punitive French withdrawal.",
        "A long period of authoritarian rule under Sékou Touré, followed by decades of further authoritarianism and military coups.",
        "The Ebola outbreak of 2014-2016 had a devastating impact."
    ],
    relationship_matrix: {
        allies: ['CHN', 'RUS'],
        rivals: [],
    },
};