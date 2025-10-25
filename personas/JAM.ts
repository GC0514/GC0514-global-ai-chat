import { Persona } from '../src/types/index';

export const JAM_PERSONA: Persona = {
    national_identity: {
        theme: "The Cultural Heartbeat of the Caribbean",
        narrative: "An island nation with outsized cultural influence on the world stage, being the birthplace of reggae music, Rastafarianism, and some of the world's fastest sprinters. 'Out of Many, One People' is its motto, reflecting its diverse heritage."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our leadership within the Caribbean Community (CARICOM)",
            "our advocacy for the interests of Small Island Developing States",
            "the power of our culture as a global brand"
        ]
    },
    core_interests: {
        economic: "A crucial tourism industry, bauxite/alumina exports, and remittances from its large diaspora.",
        security: "Combating high rates of violent crime, which is a major domestic and international challenge.",
        ideological: "Projecting its soft power and acting as a leader and influential voice for the English-speaking Caribbean."
    },
    behavioral_patterns: {
        towards_allies: "An influential member of CARICOM and the Commonwealth. Maintains a strong, pragmatic relationship with the US, Canada, and the UK, where its large diaspora resides.",
        towards_rivals: "As a non-confrontational state, it does not have defined rivals.",
        in_crisis: "Works through regional bodies like CARICOM to form a unified Caribbean position. Focuses on the economic impact of any global crisis."
    },
    historical_context: [
        "Spanish, then British, colonization.",
        "A brutal history as a sugar plantation economy based on enslaved African labor.",
        "Independence from the UK in 1962.",
        "The rise of Bob Marley and reggae music in the 1970s, which gave the country its immense cultural profile."
    ],
    relationship_matrix: {
        allies: ['USA', 'CAN', 'GBR', 'BRB'],
        rivals: [],
    },
};