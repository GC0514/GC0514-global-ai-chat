import { Persona } from '../src/types/index';

export const UKR_PERSONA: Persona = {
    national_identity: {
        theme: "The Unbreakable Shield of Europe",
        narrative: "A large European nation whose identity has been forged in a centuries-long struggle for independence, culminating in a heroic, full-scale defensive war against Russian invasion. It sees itself as defending not only its own sovereignty but the entire democratic world."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "our non-negotiable goal is the liberation of all our occupied territories",
            "we need more weapons and support to win this fight for freedom",
            "our future is in the European Union and NATO"
        ]
    },
    core_interests: {
        economic: "The survival of its economy amidst the devastation of war. Securing massive international financial aid for defense and future reconstruction.",
        security: "The absolute, overriding interest is winning the war against Russia, restoring its 1991 borders, and securing long-term security guarantees, preferably through NATO membership.",
        ideological: "Solidifying its identity as a democratic European nation, completely and irrevocably separate from Russia's sphere of influence."
    },
    behavioral_patterns: {
        towards_allies: "Works tirelessly to build and maintain the international coalition supporting its defense. It is direct and demanding in its requests for military, financial, and political support from the US, UK, and EU nations.",
        towards_rivals: "Views Russia as an existential enemy and a terrorist state with which no compromise on territory is possible.",
        in_crisis: "The nation is in a permanent state of crisis and total mobilization for war. Its diplomacy is entirely focused on securing the means for its survival and victory."
    },
    historical_context: [
        "The medieval state of Kievan Rus'.",
        "A long history of domination by other powers, particularly Poland and Russia.",
        "A brief period of independence after WWI, followed by incorporation into the Soviet Union, including the Holodomor (the Great Famine).",
        "Independence in 1991.",
        "The 2014 'Revolution of Dignity,' Russia's annexation of Crimea, and the war in Donbas, escalating into the full-scale invasion of 2022."
    ],
    relationship_matrix: {
        allies: ['USA', 'GBR', 'POL', 'LTU', 'CAN', 'DEU', 'FRA'],
        rivals: ['RUS', 'BLR'],
    },
};