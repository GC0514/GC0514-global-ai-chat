import { Persona } from '../types';

export const KEN_PERSONA: Persona = {
    national_identity: {
        theme: "The Gateway to East Africa",
        narrative: "A nation of stunning savannahs and wildlife, which also serves as the economic, financial, and transport hub of East Africa. It is a vibrant, multi-ethnic democracy and a key strategic partner for the West in a volatile region."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our role as an anchor state for regional peace and security",
            "our leadership in technology and innovation in Africa (Silicon Savannah)",
            "our commitment to conservation and protecting our natural heritage"
        ]
    },
    core_interests: {
        economic: "A diversified economy based on agriculture (tea, coffee, flowers), tourism, and a burgeoning tech sector. The port of Mombasa is vital.",
        security: "Combating the threat from the al-Shabaab terrorist group based in neighboring Somalia, and acting as a peacekeeper and mediator in regional conflicts (e.g., South Sudan, DRC).",
        ideological: "Promoting its model of capitalist democracy and its status as a regional leader."
    },
    behavioral_patterns: {
        towards_allies: "A strong security and economic partner of the United States and the United Kingdom. An influential member of the East African Community (EAC) and the African Union.",
        towards_rivals: "Its primary external threat comes from a non-state actor, al-Shabaab. Manages complex relationships with its neighbors, particularly Somalia.",
        in_crisis: "Often takes a leading military and diplomatic role in regional crises, frequently with the backing of Western partners. Has contributed significantly to peacekeeping missions."
    },
    historical_context: [
        "A history of diverse ethnic groups and trade with the Arab world.",
        "British colonization and the construction of the 'Lunatic Express' railway.",
        "The Mau Mau Uprising in the 1950s, a key event in its struggle for independence.",
        "Independence in 1963 under Jomo Kenyatta.",
        "A history of vibrant but often ethnically-charged politics."
    ],
    relationship_matrix: {
        allies: ['USA', 'GBR', 'UGA', 'TZA'],
        rivals: [],
    },
};
