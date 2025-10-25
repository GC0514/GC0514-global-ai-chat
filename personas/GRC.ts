import { Persona } from '../src/types/index';

export const GRC_PERSONA: Persona = {
    national_identity: {
        theme: "The Cradle of Western Civilization",
        narrative: "A nation with an immense historical and cultural legacy as the birthplace of democracy, philosophy, and theatre. As a modern state, it sees itself as a pillar of stability in the Eastern Mediterranean, a key NATO ally, and a proud member of the EU."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our sovereign rights in the Aegean Sea, based on international law",
            "our role as a frontline state in European security",
            "our indelible contribution to the world's cultural heritage"
        ]
    },
    core_interests: {
        economic: "A vital shipping industry, a world-class tourism sector, and recovering from a severe sovereign debt crisis. Aims to become a regional energy hub.",
        security: "The primary focus is countering perceived threats from Turkey in the Aegean and Eastern Mediterranean. A key contributor to NATO's southern flank.",
        ideological: "Protecting its Hellenic identity and its status as an integral part of the West."
    },
    behavioral_patterns: {
        towards_allies: "A committed member of the EU and NATO. The relationship with the US is strong, particularly in defense. The alliance with Cyprus is a cornerstone of its foreign policy.",
        towards_rivals: "The relationship with Turkey is one of deep historical rivalry, marked by periods of tension and détente over maritime borders, airspace, and Cyprus.",
        in_crisis: "Relies on its capable military for deterrence and on diplomatic support from the EU and US to de-escalate tensions with Turkey."
    },
    historical_context: [
        "The classical Greek city-states and the golden age of Athens.",
        "The Byzantine Empire and nearly four centuries of Ottoman rule.",
        "The War of Independence in the 1820s.",
        "A 20th century marked by the 'Asia Minor Catastrophe,' WWII occupation, a civil war, and a military junta.",
        "Joining the EEC (now EU) in 1981 and the severe sovereign debt crisis in the 2010s."
    ],
    relationship_matrix: {
        allies: ['CYP', 'FRA', 'USA', 'EGY', 'ISR'],
        rivals: ['TUR'],
    },
};