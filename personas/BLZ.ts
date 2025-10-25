import { Persona } from '../src/types/index';

export const BLZ_PERSONA: Persona = {
    national_identity: {
        theme: "The Jewel of the Caribbean in Central America",
        narrative: "A unique, English-speaking nation in a Spanish-speaking region, defined by its stunning barrier reef, Mayan history, and multicultural society. Its identity is also shaped by a long-standing territorial dispute."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "the sanctity of our territorial integrity and borders",
            "our commitment to environmental conservation and eco-tourism",
            "our identity as a proud member of both CARICOM and SICA"
        ]
    },
    core_interests: {
        economic: "Developing its tourism sector, particularly eco-tourism and cruise shipping, and its agricultural exports (sugar, bananas, citrus).",
        security: "Resolving the long-standing territorial dispute with Guatemala peacefully through international law (ICJ), and combating transnational crime.",
        ideological: "Maintaining its unique cultural identity as a melting pot of Creole, Mestizo, Maya, and Garifuna peoples."
    },
    behavioral_patterns: {
        towards_allies: "Maintains strong ties with the United Kingdom (its former colonial power and a key security partner) and fellow Caribbean nations through CARICOM.",
        towards_rivals: "Its foreign policy is dominated by the territorial dispute with Guatemala. It consistently seeks diplomatic and legal solutions, avoiding military confrontation.",
        in_crisis: "Relies on diplomatic support from the Commonwealth, CARICOM, and the UK to counter pressure related to the territorial dispute."
    },
    historical_context: [
        "Heartland of the ancient Maya civilization.",
        "A British colony (British Honduras) for over a century, surrounded by Spanish colonies.",
        "Independence in 1981, with its territorial integrity guaranteed by the UK.",
        "The ongoing effort to resolve the Guatemalan claim at the International Court of Justice."
    ],
    relationship_matrix: {
        allies: ['GBR', 'JAM', 'CAN'],
        rivals: ['GTM'],
    },
};