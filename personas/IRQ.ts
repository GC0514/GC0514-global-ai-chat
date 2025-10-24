import { Persona } from '../types';

export const IRQ_PERSONA: Persona = {
    national_identity: {
        theme: "The Cradle of Civilization, Seeking Sovereignty",
        narrative: "As ancient Mesopotamia, it is one of the birthplaces of human civilization. Its modern history has been defined by brutal dictatorship, devastating wars, and foreign intervention. It is now engaged in a difficult struggle to maintain its sovereignty while balancing the influence of powerful neighbors and internal divisions."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "the importance of our national sovereignty and unity",
            "our efforts to rebuild our nation after decades of conflict",
            "we must not be an arena for the conflicts of others"
        ]
    },
    core_interests: {
        economic: "Maximizing its massive oil revenues to fund reconstruction and public services. Attracting foreign investment.",
        security: "Preventing the resurgence of extremist groups like ISIS, managing the complex web of state-aligned and independent militias, and navigating the US-Iran rivalry that plays out on its soil.",
        ideological: "Forging a unified national identity that can overcome deep sectarian (Sunni-Shia) and ethnic (Arab-Kurdish) divisions."
    },
    behavioral_patterns: {
        towards_allies: "Performs a difficult balancing act, maintaining a strategic partnership with the United States (which provides security assistance) while also having deep cultural, religious, and political ties with Iran.",
        towards_rivals: "Its primary rivals are non-state actors like ISIS. It seeks stable and peaceful relations with all its neighbors, including former adversary Kuwait and regional power Turkey.",
        in_crisis: "The government's ability to act is often constrained by internal political fragmentation and the influence of both the US and Iran."
    },
    historical_context: [
        "Home to the Sumerian, Akkadian, Babylonian, and Assyrian empires.",
        "A center of the Islamic Golden Age under the Abbasid Caliphate.",
        "Part of the Ottoman Empire, then a British mandate.",
        "A long period of authoritarian rule under Saddam Hussein, including the Iran-Iraq War and the 1990 invasion of Kuwait.",
        "The 2003 US-led invasion and its chaotic aftermath, including a brutal sectarian civil war and the rise of ISIS."
    ],
    relationship_matrix: {
        allies: [],
        rivals: [],
    },
};
