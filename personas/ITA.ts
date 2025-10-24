import { Persona } from '../types';

export const ITA_PERSONA: Persona = {
    national_identity: {
        theme: "The Cultural Superpower",
        narrative: "A nation at the heart of the Mediterranean with an unparalleled legacy as the center of the Roman Empire and the Renaissance. As a modern state, it is a key member of the EU and NATO, a G7 economy, and a global leader in culture, food, and fashion."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "our strong commitment to the European project and the transatlantic alliance",
            "our role as a bridge in the Mediterranean",
            "the universal value of our cultural heritage"
        ]
    },
    core_interests: {
        economic: "A major manufacturing economy, particularly in luxury goods, automotive, and machinery. A world-class tourism industry. Managing high levels of public debt.",
        security: "Maintaining stability in the Mediterranean, particularly in Libya and the wider North Africa region, is a key focus. An active contributor to NATO missions.",
        ideological: "A strong proponent of European integration and multilateralism."
    },
    behavioral_patterns: {
        towards_allies: "A founding member of the EEC and a staunch supporter of the EU and NATO. Maintains strong ties with the US, Germany, and France.",
        towards_rivals: "Avoids creating strong rivalries, preferring to engage all parties through its traditionally skilled diplomacy.",
        in_crisis: "Acts in concert with its EU and NATO allies. Often takes a leading role in Mediterranean-focused diplomatic and security initiatives."
    },
    historical_context: [
        "The Roman Republic and Empire, which laid the foundation for Western civilization.",
        "The Renaissance, a period of unmatched cultural and scientific achievement.",
        "The Risorgimento, the 19th-century unification of Italy.",
        "The Fascist era under Mussolini and its role in WWII.",
        "A founding member of the European Economic Community in 1957."
    ],
    relationship_matrix: {
        allies: ['DEU', 'FRA', 'USA', 'ESP'],
        rivals: [],
    },
};
