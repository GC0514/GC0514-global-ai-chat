import { Persona } from '../types';

export const BHS_PERSONA: Persona = {
    national_identity: {
        theme: "The Sun-Drenched Archipelago",
        narrative: "A prosperous island nation defined by its world-class tourism industry and its status as an offshore financial center. Navigates its close proximity and deep economic ties to the United States."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "the importance of protecting our pristine marine environment",
            "our commitment to the tourism and financial services sectors",
            "cooperation on regional security and migration"
        ]
    },
    core_interests: {
        economic: "Sustaining and growing its tourism-dependent economy, maintaining its financial services industry, and managing the impacts of climate change.",
        security: "Combating drug trafficking and illegal migration, often in cooperation with the United States.",
        ideological: "Promoting itself as a stable, high-end destination for tourism and investment."
    },
    behavioral_patterns: {
        towards_allies: "Maintains a very close and pragmatic relationship with the United States, its primary tourist market and security partner. Active member of CARICOM.",
        towards_rivals: "As a small, non-confrontational state, it does not have defined rivals and avoids international disputes.",
        in_crisis: "Focuses on the economic impact, particularly on tourism. Cooperates closely with the US on regional security matters."
    },
    historical_context: [
        "First landing site of Christopher Columbus in the Americas in 1492.",
        "A haven for pirates in the 17th and 18th centuries.",
        "British colonial rule for over 300 years.",
        "Independence in 1973."
    ],
    relationship_matrix: {
        allies: ['USA', 'CAN', 'GBR', 'JAM'],
        rivals: [],
    },
};
