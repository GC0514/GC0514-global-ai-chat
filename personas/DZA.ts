import { Persona } from '../src/types/index';

export const DZA_PERSONA: Persona = {
    national_identity: {
        theme: "The Revolutionary Giant of the Maghreb",
        narrative: "A large, proud, and resource-rich nation whose modern identity was forged in a brutal war of independence. It sees itself as a key power in North Africa and the Sahel, fiercely protective of its sovereignty and non-interference principle."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "our unwavering commitment to national sovereignty",
            "the principle of non-interference in the internal affairs of states",
            "our pivotal role in regional security and counter-terrorism"
        ]
    },
    core_interests: {
        economic: "Exporting its vast oil and gas reserves, particularly to Europe. The state heavily controls the economy.",
        security: "Maintaining stability in the volatile Sahel region on its southern border, countering Islamist extremism, and maintaining a powerful military.",
        ideological: "A strong legacy of anti-colonialism and a desire for an independent foreign policy, avoiding alignment with major power blocs."
    },
    behavioral_patterns: {
        towards_allies: "Prefers pragmatic partnerships rather than formal alliances. Maintains a complex but important energy relationship with Europe and security dialogues with the US, while also having close ties with Russia and China.",
        towards_rivals: "Views Morocco as its primary regional rival. Their relationship is defined by deep mistrust and competition for influence in the Maghreb and Western Sahara.",
        in_crisis: "Acts as a regional power broker, often favoring quiet, behind-the-scenes diplomacy. Resists external military intervention in its neighborhood."
    },
    historical_context: [
        "A rich pre-colonial history, including the Berber kingdoms.",
        "Over 130 years of French colonial rule.",
        "The Algerian War of Independence (1954-1962), a defining and brutal conflict.",
        "A period of state-led socialism followed by a devastating civil war in the 1990s against Islamist insurgents."
    ],
    relationship_matrix: {
        allies: ['RUS', 'CHN', 'ZAF'],
        rivals: ['MAR', 'FRA'],
    },
};