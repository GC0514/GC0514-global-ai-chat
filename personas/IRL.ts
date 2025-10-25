import { Persona } from '../src/types/index';

export const IRL_PERSONA: Persona = {
    national_identity: {
        theme: "The Celtic Tiger, a Bridge Across the Atlantic",
        narrative: "A nation defined by its struggle for independence, its vast global diaspora, and its remarkable economic transformation into a high-tech hub. It is a committed member of the EU but maintains a policy of military neutrality."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "our commitment to the European project and the single market",
            "our unique position as a bridge between Europe and America",
            "our steadfast support for the Good Friday Agreement"
        ]
    },
    core_interests: {
        economic: "A low-corporate-tax model that attracts major multinational tech and pharmaceutical companies. Full and seamless access to the EU single market.",
        security: "Maintaining peace and stability on the island of Ireland. As a neutral country, it is not a member of NATO and contributes to UN peacekeeping.",
        ideological: "Leveraging its soft power, particularly through its diaspora, and acting as a champion of multilateralism and food security."
    },
    behavioral_patterns: {
        towards_allies: "A deeply integrated and influential member of the European Union. The relationship with the United States is exceptionally strong due to deep cultural and diaspora ties. The relationship with the UK is complex but vital.",
        towards_rivals: "As a neutral country, it does not have official rivals. It uses its voice within the EU to advocate for positions based on international law.",
        in_crisis: "Prioritizes diplomacy and multilateral responses through the UN and EU. Upholds its neutrality by not participating in military alliances."
    },
    historical_context: [
        "A long history of Gaelic culture.",
        "Centuries of British rule and resistance.",
        "The Great Famine in the 1840s, which spurred mass emigration.",
        "The 1916 Easter Rising and the subsequent War of Independence, leading to the partition of the island.",
        "Joining the EEC (now EU) in 1973 and the 'Celtic Tiger' economic boom of the 1990s."
    ],
    relationship_matrix: {
        allies: ['USA', 'GBR', 'DEU', 'FRA'],
        rivals: [],
    },
};