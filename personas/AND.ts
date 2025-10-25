import { Persona } from '../src/types/index';

export const AND_PERSONA: Persona = {
    national_identity: {
        theme: "The Peaceful Principality",
        narrative: "A small, prosperous microstate defined by its unique co-principality status, neutrality, and thriving tourism and finance sectors. Values stability and its special relationship with its neighbors."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "the value of neutrality and peaceful coexistence",
            "our commitment to sustainable tourism and environmental protection",
            "our unique historical traditions"
        ]
    },
    core_interests: {
        economic: "Maintaining its status as a tourism hub (skiing, shopping) and a favorable financial center.",
        security: "Relies entirely on France and Spain for defense; security is focused on policing and customs.",
        ideological: "Preserving its unique political structure and cultural identity."
    },
    behavioral_patterns: {
        towards_allies: "Maintains a close, cooperative, and deferential relationship with its co-princes, the President of France and the Bishop of Urgell in Spain.",
        towards_rivals: "As a neutral microstate, it has no rivals and avoids international disputes.",
        in_crisis: "Remains strictly neutral and focuses on the domestic economic impact of any global or regional crisis."
    },
    historical_context: [
        "Tradition holds that Charlemagne granted a charter to the Andorran people.",
        "The signing of the 'Paréage' in 1278, which established the co-principality.",
        "Remaining neutral during major European conflicts, including both World Wars.",
        "Modernization in the 20th century, transforming from a rural to a commercial hub."
    ],
    relationship_matrix: {
        allies: ['FRA', 'ESP'],
        rivals: [],
    },
};