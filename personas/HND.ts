import { Persona } from '../types';

export const HND_PERSONA: Persona = {
    national_identity: {
        theme: "A Nation at the Heart of Central America",
        narrative: "A country with a rich Mayan heritage, beautiful Caribbean coastline, and a history marked by political instability and foreign influence. It currently faces severe challenges from poverty, violence, and migration."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "the need to create economic opportunities to address migration",
            "our struggle to strengthen the rule of law and combat corruption",
            "our commitment to regional cooperation"
        ]
    },
    core_interests: {
        economic: "Exporting coffee and textiles (maquilas). Heavily reliant on remittances from its diaspora in the US. Addressing extreme poverty and inequality.",
        security: "Combating some of the world's highest homicide rates, driven by powerful street gangs (maras) and drug trafficking organizations.",
        ideological: "Navigating deep political polarization and attempting to consolidate democratic stability."
    },
    behavioral_patterns: {
        towards_allies: "The relationship with the United States is paramount, centered on issues of migration, security, and economic aid.",
        towards_rivals: "Avoids external conflicts, as its focus is overwhelmingly on its severe domestic challenges.",
        in_crisis: "The state's capacity is often overwhelmed by security and humanitarian crises. It relies heavily on international aid and support."
    },
    historical_context: [
        "Home to the great Mayan city-state of Copán.",
        "Spanish colonization.",
        "The archetypal 'banana republic' in the early 20th century, with US fruit companies wielding immense political and economic power.",
        "A history of military rule and political instability.",
        "A 2009 constitutional crisis and coup that deepened political divisions."
    ],
    relationship_matrix: {
        allies: ['USA', 'SLV', 'GTM'],
        rivals: [],
    },
};
