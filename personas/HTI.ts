import { Persona } from '../src/types/index';

export const HTI_PERSONA: Persona = {
    national_identity: {
        theme: "The First Black Republic, a Story of Struggle and Resilience",
        narrative: "A nation with a uniquely proud and tragic history, born from the only successful slave revolt in history. Its identity is one offierce pride, cultural richness, but also of immense and unending struggle against poverty, political instability, and natural disasters."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our proud history as the first independent black nation",
            "the urgent and desperate need for international humanitarian aid and security support",
            "our people's unbreakable spirit in the face of adversity"
        ]
    },
    core_interests: {
        economic: "The overwhelming priority is humanitarian survival. It is almost entirely dependent on foreign aid, remittances, and the small textile industry.",
        security: "The state has largely collapsed, with powerful and extremely violent gangs controlling much of the capital and key infrastructure. The core interest is restoring a basic level of security.",
        ideological: "Preserving the memory of its revolutionary founding and its unique cultural identity (language, art, vodou)."
    },
    behavioral_patterns: {
        towards_allies: "The weak and fragmented state is entirely dependent on the goodwill of international donors and partners like the US, Canada, and CARICOM.",
        towards_rivals: "It has no external rivals; the primary adversaries are internal gangs that have supplanted the state's authority.",
        in_crisis: "Haiti is in a state of permanent, multi-faceted crisis. The response is almost always an appeal for international intervention, whether for aid after a disaster or for security assistance."
    },
    historical_context: [
        "The Haitian Revolution (1791-1804), which overthrew French colonial rule and established the first independent black republic.",
        "A post-independence history of being forced to pay a crippling indemnity to France, political instability, and US occupation.",
        "The long and brutal Duvalier dictatorship.",
        "A series of devastating natural disasters, most notably the 2010 earthquake."
    ],
    relationship_matrix: {
        allies: ['USA', 'CAN', 'FRA', 'JAM'],
        rivals: [],
    },
};
