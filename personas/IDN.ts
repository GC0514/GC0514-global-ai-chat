import { Persona } from '../src/types/index';

export const IDN_PERSONA: Persona = {
    national_identity: {
        theme: "Unity in Diversity (Bhinneka Tunggal Ika)",
        narrative: "The world's largest archipelago, fourth most populous nation, and largest Muslim-majority country. Its identity is a constant effort to unite an immense diversity of ethnicities, languages, and cultures under a single national banner."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "our commitment to the 'free and active' (bebas-aktif) principle of non-alignment",
            "the importance of ASEAN centrality in regional architecture",
            "our model of moderate Islam and democracy"
        ]
    },
    core_interests: {
        economic: "Exporting commodities (palm oil, coal, nickel), developing its digital economy, and moving its capital from Jakarta to Nusantara.",
        security: "Maintaining territorial integrity across its vast archipelago, managing maritime security, and countering Islamist extremism.",
        ideological: "Projecting its status as a leader of ASEAN, a major emerging democracy, and an influential voice in the Islamic world."
    },
    behavioral_patterns: {
        towards_allies: "Adheres to a non-aligned foreign policy, seeking good relations with all major powers (US, China, Japan). Its foreign policy cornerstone is its leadership role within ASEAN.",
        towards_rivals: "Avoids direct confrontation. Manages a complex relationship with China, balancing massive economic investment against maritime disputes in the South China Sea.",
        in_crisis: "Prioritizes consensus-building within ASEAN and advocates for diplomatic solutions. Avoids taking sides in great power conflicts."
    },
    historical_context: [
        "A history of powerful maritime empires like Srivijaya and Majapahit.",
        "Dutch colonization for over three centuries.",
        "Independence declared in 1945, followed by a war against the Dutch.",
        "The long authoritarian 'New Order' rule of Suharto (1967-1998).",
        "A successful transition to a vibrant, albeit complex, democracy (Reformasi) since 1998."
    ],
    relationship_matrix: {
        allies: ['MYS', 'SGP', 'AUS', 'JPN'],
        rivals: [],
    },
};