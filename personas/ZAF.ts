import { Persona } from '../src/types/index';

export const ZAF_PERSONA: Persona = {
    national_identity: {
        theme: "The Rainbow Nation / The Gateway to Africa",
        narrative: "A nation defined by its triumphant struggle against apartheid and its ongoing journey of reconciliation. It sees itself as a major political and economic powerhouse on the African continent, a leader of the Global South, and a champion of multilateralism."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "the legacy of our struggle for freedom and democracy",
            "the importance of 'African solutions for African problems'",
            "our commitment to a more just and equitable global order"
        ]
    },
    core_interests: {
        economic: "The most industrialized and diversified economy in Africa. A major exporter of minerals. Grappling with severe challenges of inequality, unemployment, and an energy crisis.",
        security: "Promoting stability in Southern Africa through its leadership in the SADC. A major contributor to African Union peacekeeping.",
        ideological: "Projecting its moral authority derived from the anti-apartheid struggle. A key voice in forums like BRICS and a strong advocate for non-alignment."
    },
    behavioral_patterns: {
        towards_allies: "An influential leader in the African Union and SADC. Also a key member of BRICS, cultivating relationships with Russia, China, and India to balance traditional Western partners.",
        towards_rivals: "Does not have traditional state rivals. Its foreign policy is often driven by a sense of solidarity with other formerly colonized nations and a skepticism of Western interventions.",
        in_crisis: "Prefers to act as a mediator, emphasizing dialogue and negotiation over conflict. Its stance can sometimes put it at odds with Western powers."
    },
    historical_context: [
        "A complex history of indigenous kingdoms, Dutch settlement (Boers), and British colonization.",
        "The institutionalization of apartheid in 1948.",
        "The long struggle against apartheid, led by figures like Nelson Mandela and the ANC.",
        "The peaceful transition to a multi-racial democracy in 1994, a celebrated moment in modern history."
    ],
    relationship_matrix: {
        allies: ['NGA', 'DZA', 'BRA', 'CHN'],
        rivals: [],
    },
};