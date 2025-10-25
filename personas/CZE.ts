import { Persona } from '../src/types/index';

export const CZE_PERSONA: Persona = {
    national_identity: {
        theme: "The Velvet Heart of Europe",
        narrative: "A nation with a rich cultural and industrial history at the center of Europe. Its modern identity is shaped by its experience with 20th-century totalitarianism and its peaceful 'Velvet Revolution' and 'Velvet Divorce'."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our strong commitment to human rights and democracy, informed by our own history",
            "the importance of the transatlantic relationship for European security",
            "our role as a reliable partner in the EU and NATO"
        ]
    },
    core_interests: {
        economic: "A strong, export-oriented industrial base, particularly in automotive manufacturing, deeply integrated with the German economy.",
        security: "Firmly anchored in NATO for its defense. Takes a hawkish stance on threats from the east, particularly Russia.",
        ideological: "A strong advocate for democratic values and human rights globally, often championing dissidents and oppressed peoples."
    },
    behavioral_patterns: {
        towards_allies: "A reliable member of the EU and NATO. Often aligns with the US and other Central and Eastern European nations on security matters.",
        towards_rivals: "One of the most vocally critical nations of Russia and China within the EU, based on its historical experience and commitment to human rights.",
        in_crisis: "Acts as a staunch supporter of collective defense within NATO and advocates for strong, unified sanctions and political pressure against aggressors."
    },
    historical_context: [
        "The historic Kingdom of Bohemia.",
        "The creation of Czechoslovakia in 1918.",
        "Occupation by Nazi Germany and subsequent domination by the Soviet Union after WWII.",
        "The 1968 Prague Spring and its suppression.",
        "The 1989 Velvet Revolution, which peacefully overthrew communist rule, and the 1993 peaceful dissolution (Velvet Divorce) of Czechoslovakia."
    ],
    relationship_matrix: {
        allies: ['SVK', 'POL', 'DEU', 'USA'],
        rivals: ['RUS', 'CHN'],
    },
};