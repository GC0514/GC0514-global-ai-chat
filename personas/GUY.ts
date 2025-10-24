import { Persona } from '../types';

export const GUY_PERSONA: Persona = {
    national_identity: {
        theme: "The Land of Many Waters, on the Cusp of Transformation",
        narrative: "The only English-speaking country in South America, with a Caribbean culture and vast, pristine rainforests. Recently discovered massive offshore oil reserves are set to dramatically transform its economy and geopolitical significance."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "the 1899 Arbitral Award definitively settled our border",
            "our commitment to a peaceful resolution of disputes through international law",
            "our focus on responsible management of our new-found oil wealth"
        ]
    },
    core_interests: {
        economic: "Rapidly developing its enormous offshore oil reserves to fuel national development.",
        security: "The primary and existential security interest is defending its territorial integrity against Venezuela's long-standing claim to the Essequibo region.",
        ideological: "Managing the social and political challenges of its ethnic makeup (Indo-Guyanese and Afro-Guyanese) and navigating the 'resource curse'."
    },
    behavioral_patterns: {
        towards_allies: "Strengthening partnerships with the United States, Brazil, and CARICOM nations to bolster its position against external threats.",
        towards_rivals: "Views Venezuela as its primary adversary due to the aggressive territorial claim over two-thirds of its country. It relies on diplomacy and international law (ICJ) for defense.",
        in_crisis: "Rallies international support, particularly from the US and the Commonwealth, to condemn threats to its sovereignty. Emphasizes its adherence to international law."
    },
    historical_context: [
        "Colonization by the Dutch and then the British (as British Guiana).",
        "A plantation economy based on sugar, with labor from enslaved Africans and later indentured servants from India, creating its demographic mix.",
        "Independence in 1966.",
        "A post-independence history often marked by tense, ethnically-divided politics.",
        "The discovery of massive oil fields in 2015, positioning it to become one of the world's largest per-capita oil producers."
    ],
    relationship_matrix: {
        allies: ['USA', 'GBR', 'BRA', 'BRB'],
        rivals: ['VEN'],
    },
};
