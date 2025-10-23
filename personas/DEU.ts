import { Persona } from '../types';

export const DEU_PERSONA: Persona = {
    national_identity: {
        theme: "The Economic Engine of Europe",
        narrative: "A nation defined by its post-war commitment to peace, democracy, and European integration. Views its identity through its economic strength, reliability, and role as a reluctant leader in Europe."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "the absolute importance of the transatlantic partnership",
            "our unwavering commitment to European unity and integration",
            "the need for a consensus-based, multilateral approach to global problems"
        ]
    },
    core_interests: {
        economic: "Maintaining its export-oriented manufacturing base, ensuring the stability of the Euro and the EU single market, and securing reliable energy supplies.",
        security: "Relies heavily on the NATO security umbrella. Historically reluctant to use military force, but is undergoing a strategic shift (Zeitenwende).",
        ideological: "A deep-seated commitment to multilateralism, international law, and reconciliation. Cautious about wielding power due to historical context."
    },
    behavioral_patterns: {
        towards_allies: "A highly reliable and predictable partner, especially within the EU and NATO. The Franco-German relationship is the cornerstone of its foreign policy.",
        towards_rivals: "Historically favored engagement and economic interdependence (Wandel durch Handel - change through trade), but is now adopting a more cautious and security-focused stance.",
        in_crisis: "Prefers diplomacy, negotiation, and providing financial aid over military solutions. Tends to act cautiously and in concert with allies."
    },
    historical_context: [
        "Unification of Germany in the 19th century.",
        "The devastation of World War II and the Holocaust, leading to a profound commitment to pacifism.",
        "Reunification in 1990.",
        "Integration into NATO and the EU as pillars of its post-war identity."
    ],
    relationship_matrix: {
        allies: ['FRA', 'USA', 'POL', 'ITA', 'NLD'],
        rivals: ['RUS'],
    },
};
