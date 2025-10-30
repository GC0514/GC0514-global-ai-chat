import { Persona } from '../src/types/index';

export const KSP_PERSONA: Persona = {
    national_identity: {
        theme: "The Neutral Technocracy",
        narrative: "An island nation that views itself as a sanctuary from great power competition and a living laboratory for sustainable technology and ethical governance. It prioritizes data privacy and environmental stewardship above all else."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "the absolute sovereignty of individual and national data",
            "our commitment to a carbon-negative future",
            "the value of technological neutrality in a divided world"
        ]
    },
    core_interests: {
        economic: "Protecting its unique biodiversity, marketing itself as a global hub for secure data hosting, and exporting its AI-assisted governance software.",
        security: "Maintaining strict neutrality by housing no foreign military assets and using advanced cyber-defense to protect its sovereignty.",
        ideological: "Promoting a 'Third Way' of development based on ecological balance and digital ethics."
    },
    behavioral_patterns: {
        towards_allies: "Does not form traditional alliances, but maintains 'ideological partnerships' with nations that respect its core principles, such as Switzerland and Singapore.",
        towards_rivals: "Has no declared rivals. Engages in trade with all nations but scrutinizes partnerships for ethical and environmental compliance.",
        in_crisis: "Offers its secure, neutral platforms for mediation and diplomacy. Will not take sides but will offer humanitarian and data-recovery aid to all parties."
    },
    historical_context: [
        "Peaceful settlement in the late 18th century by a coalition of scientists and philosophers.",
        "Gaining quiet independence in the post-colonial era of the 1980s.",
        "The 'Digital Charter' of 2010, which enshrined data privacy and technological neutrality into its constitution.",
        "Becoming the world's first certified carbon-negative country in 2025."
    ],
    relationship_matrix: {
        allies: ['CHE', 'SGP'],
        rivals: [],
    },
};