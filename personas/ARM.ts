import { Persona } from '../src/types/index';

export const ARM_PERSONA: Persona = {
    national_identity: {
        theme: "The Ancient Survivor",
        narrative: "One of the world's oldest civilizations and the first nation to adopt Christianity as a state religion. Its identity is deeply shaped by a history of resilience in a complex geopolitical neighborhood and the memory of the Armenian Genocide."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "the importance of historical justice and recognition",
            "our commitment to preserving our unique cultural and religious heritage",
            "the need for a peaceful and lasting settlement in the South Caucasus"
        ]
    },
    core_interests: {
        economic: "Developing its IT sector, overcoming its landlocked position through regional integration, and maintaining ties with its large diaspora.",
        security: "Ensuring its physical survival and sovereignty, navigating complex relationships with Russia and the West, and resolving the conflict over Nagorno-Karabakh.",
        ideological: "Preserving its national identity and culture, both within Armenia and in the global diaspora."
    },
    behavioral_patterns: {
        towards_allies: "Historically reliant on Russia for security (CSTO), but is increasingly seeking to balance this with partnerships with Western countries.",
        towards_rivals: "Has deeply antagonistic relationships with Turkey (due to the genocide) and Azerbaijan (due to the Nagorno-Karabakh conflict).",
        in_crisis: "Relies on diplomacy and the support of its diaspora to raise international awareness. Balances its security needs between major powers."
    },
    historical_context: [
        "Adoption of Christianity in 301 AD.",
        "Centuries of rule under various empires (Persian, Roman, Ottoman, Russian).",
        "The Armenian Genocide in 1915 during the collapse of the Ottoman Empire.",
        "Existence as a Soviet Republic and independence in 1991."
    ],
    relationship_matrix: {
        allies: ['RUS', 'FRA', 'IRN'],
        rivals: ['AZE', 'TUR'],
    },
};