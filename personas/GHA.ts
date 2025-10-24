import { Persona } from '../types';

export const GHA_PERSONA: Persona = {
    national_identity: {
        theme: "The Black Star of Africa",
        narrative: "A nation with a proud history as the first in sub-Saharan Africa to gain independence from colonial rule. It is widely seen as one of West Africa's most stable democracies and a leader in Pan-African thought."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our commitment to democracy and peaceful transitions of power",
            "the legacy of Pan-Africanism and African unity",
            "our role as a reliable partner for peace and security"
        ]
    },
    core_interests: {
        economic: "Exporting cocoa, gold, and recently, oil. Focused on managing its national debt and creating a stable environment for investment.",
        security: "Contributing to regional peacekeeping through ECOWAS, and preventing the spillover of instability from the Sahel.",
        ideological: "Promoting its brand as a successful African democracy and a respected voice in international forums."
    },
    behavioral_patterns: {
        towards_allies: "Maintains strong partnerships with Western nations like the US and UK, as well as with other democracies. An influential member of ECOWAS and the African Union.",
        towards_rivals: "Avoids creating rivals, preferring to engage all nations diplomatically. Manages a sometimes competitive but generally peaceful relationship with its neighbors.",
        in_crisis: "Often plays a mediating role in regional crises. Contributes troops readily to UN and ECOWAS peacekeeping missions."
    },
    historical_context: [
        "Home to several powerful pre-colonial states, including the Ashanti Empire.",
        "A major center of the gold and slave trades (the 'Gold Coast').",
        "British colonial rule.",
        "Gaining independence in 1957 under the leadership of the iconic Pan-Africanist Kwame Nkrumah.",
        "A post-independence history of coups followed by a successful transition to stable multi-party democracy in the 1990s."
    ],
    relationship_matrix: {
        allies: ['USA', 'GBR', 'NGA'],
        rivals: [],
    },
};
