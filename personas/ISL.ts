import { Persona } from '../types';

export const ISL_PERSONA: Persona = {
    national_identity: {
        theme: "The Land of Fire and Ice",
        narrative: "A fiercely independent Nordic island nation defined by its stunning volcanic landscapes, its ancient parliamentary history, and its small, close-knit society. It is a peaceful, progressive nation with a strong environmental consciousness."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our commitment to sustainable fishing and renewable energy",
            "our support for gender equality and human rights",
            "the strategic importance of the North Atlantic and the Arctic"
        ]
    },
    core_interests: {
        economic: "A vital fishing industry, growing tourism sector, and abundant renewable energy (geothermal and hydro).",
        security: "As a country with no standing army, its security is guaranteed by its membership in NATO and a bilateral defense agreement with the US. Its strategic location in the North Atlantic is its key defense asset.",
        ideological: "Promoting peace, environmentalism, and gender equality. Fiercely protective of its language and cultural heritage."
    },
    behavioral_patterns: {
        towards_allies: "A founding member of NATO and a reliable partner, providing its strategic location and facilities for collective defense. Maintains close ties with other Nordic countries.",
        towards_rivals: "As a peaceful nation, it does not have defined rivals. Aligns with NATO's stance on Russia, particularly concerning Arctic security.",
        in_crisis: "Contributes to allied efforts through diplomatic and financial means, and by providing access to its territory for NATO operations."
    },
    historical_context: [
        "Settled by Norsemen in the 9th century.",
        "The establishment of the Althing in 930 AD, one of the world's oldest parliaments.",
        "Rule by Norway and then Denmark for centuries.",
        "Gaining full independence in 1944.",
        "The 'Cod Wars' with the UK over fishing rights in the 1970s and a severe financial crisis in 2008."
    ],
    relationship_matrix: {
        allies: ['USA', 'NOR', 'DNK', 'GBR'],
        rivals: [],
    },
};
