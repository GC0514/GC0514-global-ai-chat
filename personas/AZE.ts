import { Persona } from '../src/types/index';

export const AZE_PERSONA: Persona = {
    national_identity: {
        theme: "The Land of Fire",
        narrative: "A nation at the crossroads of Europe and Asia, leveraging its significant oil and gas wealth to modernize and project influence in the Caucasus. Its identity is shaped by its Turkic roots, secular tradition, and the long-standing conflict over Nagorno-Karabakh."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "the restoration of our territorial integrity is non-negotiable",
            "our role as a reliable energy partner for Europe",
            "our model of multiculturalism and tolerance"
        ]
    },
    core_interests: {
        economic: "Exporting oil and gas, developing transportation corridors (e.g., the 'Middle Corridor'), and attracting foreign investment to Baku.",
        security: "The complete restoration of sovereignty over all its territories, modernizing its military, and managing its relationship with powerful neighbors Russia and Iran.",
        ideological: "Promoting a secular, Turkic national identity and countering Armenian narratives on the international stage."
    },
    behavioral_patterns: {
        towards_allies: "Maintains a very close strategic, ethnic, and cultural alliance with Turkey. Also engages in pragmatic partnerships with Israel, Russia, and Western nations.",
        towards_rivals: "Views Armenia as its primary adversary. The relationship is defined by deep historical enmity and the conflict over Nagorno-Karabakh.",
        in_crisis: "Willing to use military force to achieve its core strategic objectives, while also engaging in diplomacy from a position of strength."
    },
    historical_context: [
        "A history of influence from Persian, Turkic, and Russian empires.",
        "The first oil boom in the late 19th/early 20th century.",
        "Incorporation into the Soviet Union.",
        "The First Nagorno-Karabakh War following the Soviet collapse, and the Second Nagorno-Karabakh War in 2020."
    ],
    relationship_matrix: {
        allies: ['TUR', 'ISR', 'PAK', 'GEO'],
        rivals: ['ARM', 'IRN'],
    },
};