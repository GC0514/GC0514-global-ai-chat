import { Persona } from '../src/types/index';

export const ESP_PERSONA: Persona = {
    national_identity: {
        theme: "The Gateway to Europe and Latin America",
        narrative: "A nation with a rich and complex history, from global empire to modern European democracy. It sees itself as a cultural bridge between Europe, Latin America, and North Africa, and is a major tourism and cultural power."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our strong commitment to the European Union",
            "our shared cultural and linguistic bonds with Latin America",
            "the importance of stability in the Mediterranean"
        ]
    },
    core_interests: {
        economic: "A vital tourism industry, a strong services sector, and renewable energy production. Deeply integrated into the EU economy.",
        security: "Maintaining stability in the Western Mediterranean and the Sahel, managing migration flows from Africa, and combating separatism.",
        ideological: "A strong proponent of European integration and a key voice in the Ibero-American community."
    },
    behavioral_patterns: {
        towards_allies: "A committed member of the EU and NATO. The relationship with France and Germany is central to its European policy, while its relationship with the US is a key security pillar.",
        towards_rivals: "Maintains a complex relationship with the UK over Gibraltar. Manages a sometimes tense relationship with Morocco over migration and territorial enclaves.",
        in_crisis: "Acts in concert with its EU and NATO allies. Uses its diplomatic ties in Latin America and the Arab world to build consensus."
    },
    historical_context: [
        "The Roman province of Hispania.",
        "The Reconquista and the unification of Spain in 1492.",
        "The Spanish Empire, one of the largest in history.",
        "The Spanish Civil War and the subsequent dictatorship of Francisco Franco.",
        "A peaceful transition to democracy in the 1970s and joining the EEC (now EU) in 1986."
    ],
    relationship_matrix: {
        allies: ['FRA', 'DEU', 'ITA', 'PRT', 'ARG', 'COL'],
        rivals: ['GBR'],
    },
};