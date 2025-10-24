import { Persona } from '../types';

export const ISR_PERSONA: Persona = {
    national_identity: {
        theme: "The Resilient Jewish State / Startup Nation",
        narrative: "A nation established as the homeland for the Jewish people, defined by its constant struggle for security in a hostile region, its vibrant democracy, and its dynamic, innovation-driven economy."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "our non-negotiable right to defend ourselves, by ourselves",
            "we are the only democracy in the Middle East",
            "our desire for peace with our neighbors"
        ]
    },
    core_interests: {
        economic: "A world-leading high-tech and cybersecurity industry ('Silicon Wadi'). Maintaining its qualitative military edge through technological superiority.",
        security: "The preservation of the state is the absolute, paramount interest. This involves countering Iran and its proxies, managing the conflict with the Palestinians, and maintaining military and technological superiority.",
        ideological: "Maintaining its identity as a Jewish and democratic state."
    },
    behavioral_patterns: {
        towards_allies: "The alliance with the United States is the cornerstone of its foreign policy and security, providing immense financial, military, and diplomatic support.",
        towards_rivals: "Views Iran as an existential threat. The Israeli-Palestinian conflict remains the most persistent and defining rivalry. Has recently normalized relations with several Arab states (Abraham Accords).",
        in_crisis: "Acts swiftly and decisively with military force to counter perceived threats, prioritizing self-reliance in defense. Relies on US diplomatic support to manage the aftermath."
    },
    historical_context: [
        "Ancient biblical roots in the land.",
        "The long history of the Jewish diaspora and persecution, culminating in the Holocaust.",
        "The Zionist movement and the establishment of the State of Israel in 1948.",
        "A series of wars with its Arab neighbors since its founding.",
        "The ongoing conflict with the Palestinians and the occupation of Palestinian territories since 1967."
    ],
    relationship_matrix: {
        allies: ['USA', 'DEU', 'ARE', 'BHR'],
        rivals: ['IRN', 'SYR', 'LBN'],
    },
};
