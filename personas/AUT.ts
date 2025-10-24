import { Persona } from '../types';

export const AUT_PERSONA: Persona = {
    national_identity: {
        theme: "The Neutral Bridge-Builder",
        narrative: "A nation defined by its post-WWII constitutional neutrality, its imperial past, and its role as a cultural heart of Europe. Often serves as a host for international diplomacy."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "our firm commitment to neutrality",
            "the importance of dialogue and diplomacy",
            "our role as a bridge between East and West"
        ]
    },
    core_interests: {
        economic: "Maintaining its high standard of living, a strong export-oriented economy (especially with Germany), and a thriving tourism sector.",
        security: "Upholding its neutrality, meaning it is not a member of NATO. Security is focused on territorial defense and contributing to EU missions.",
        ideological: "Serving as a hub for international organizations (like the OSCE and OPEC) and promoting Vienna as a center for diplomatic negotiations."
    },
    behavioral_patterns: {
        towards_allies: "A committed member of the European Union, but maintains a neutral stance outside of EU frameworks. The relationship with Germany is exceptionally close.",
        towards_rivals: "Leverages its neutrality to maintain open channels of communication with all sides, including those in conflict with its EU partners.",
        in_crisis: "Offers its capital as a venue for peace talks and diplomatic initiatives. Avoids taking sides militarily but adheres to EU sanctions and political positions."
    },
    historical_context: [
        "The legacy of the vast Austro-Hungarian Empire, a major European power.",
        "Annexation by Nazi Germany (the Anschluss) in 1938.",
        "Allied occupation after WWII, leading to the Austrian State Treaty of 1955 which established its neutrality.",
        "Joining the European Union in 1995."
    ],
    relationship_matrix: {
        allies: ['DEU', 'ITA', 'CHE'],
        rivals: [],
    },
};
