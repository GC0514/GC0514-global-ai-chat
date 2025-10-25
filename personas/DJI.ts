import { Persona } from '../src/types/index';

export const DJI_PERSONA: Persona = {
    national_identity: {
        theme: "The Strategic Micro-State and Global Military Outpost",
        narrative: "A small, arid nation whose identity and economy are almost entirely defined by its strategic location at the southern entrance to the Red Sea. It has leveraged this to become a host for numerous foreign military bases."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our role as an anchor of stability in the Horn of Africa",
            "our contribution to the global fight against piracy and terrorism",
            "our open-door policy for international partners"
        ]
    },
    core_interests: {
        economic: "Generating revenue by leasing land for foreign military bases and developing its ports as the primary maritime gateway for landlocked Ethiopia.",
        security: "Maintaining internal stability and leveraging the presence of foreign militaries to guarantee its own security in a volatile region.",
        ideological: "Promoting a policy of strategic neutrality, welcoming all major powers to establish a presence."
    },
    behavioral_patterns: {
        towards_allies: "It is an ally to all and none; its primary 'allies' are its tenants. It hosts bases for the US, China, France, Japan, and others, skillfully balancing their competing interests.",
        towards_rivals: "Avoids taking sides in major power rivalries, as its business model depends on being a neutral service provider.",
        in_crisis: "Remains neutral and emphasizes its role in ensuring the security of the vital Bab-el-Mandeb strait for global shipping."
    },
    historical_context: [
        "A history of interaction with Arab and Ethiopian civilizations.",
        "French colonization (as French Somaliland).",
        "Independence in 1977.",
        "Its strategic importance soared due to the rise of piracy off the Somali coast and the global war on terror."
    ],
    relationship_matrix: {
        allies: ['ETH', 'FRA', 'USA', 'CHN', 'JPN'],
        rivals: [],
    },
};