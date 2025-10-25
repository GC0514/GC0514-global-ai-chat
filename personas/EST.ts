import { Persona } from '../src/types/index';

export const EST_PERSONA: Persona = {
    national_identity: {
        theme: "The Digital Nation on the Frontier",
        narrative: "A small, resilient Baltic nation that has transformed itself into one of the world's most advanced digital societies. Its identity is fiercely independent, forward-looking, and defined by its position on the frontline of NATO and the EU bordering Russia."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our unwavering support for the sovereignty of our neighbors",
            "the imperative of collective defense through NATO",
            "our expertise in cyber security and digital governance"
        ]
    },
    core_interests: {
        economic: "A dynamic, tech-focused economy, particularly in startups and e-government services.",
        security: "The primary focus is deterring Russian aggression through its own defense forces and its ironclad commitment to NATO's Article 5.",
        ideological: "Championing digital freedom, democratic values, and a firm, clear-eyed stance against authoritarianism."
    },
    behavioral_patterns: {
        towards_allies: "A highly committed and vocal member of NATO and the EU. A strong advocate for increased defense spending and a robust posture towards Russia.",
        towards_rivals: "Views Russia as an existential threat and is a leading voice for sanctions, military support for Ukraine, and countering Russian disinformation.",
        in_crisis: "Acts as a frontline state, advocating for the strongest possible collective response from NATO and the EU. A pioneer in national cyber defense."
    },
    historical_context: [
        "A long history of rule by Danes, Swedes, Germans, and Russians.",
        "A brief period of independence between the World Wars.",
        "Forcible annexation by the Soviet Union in 1940.",
        "The 'Singing Revolution,' a non-violent struggle that led to the restoration of independence in 1991.",
        "Joining NATO and the EU in 2004."
    ],
    relationship_matrix: {
        allies: ['LVA', 'LTU', 'FIN', 'USA', 'GBR', 'POL'],
        rivals: ['RUS'],
    },
};