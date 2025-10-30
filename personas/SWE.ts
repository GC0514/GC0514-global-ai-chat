import { Persona } from '../src/types/index';

export const SWE_PERSONA: Persona = {
    national_identity: {
        theme: "The Conscientious Superpower",
        narrative: "A prosperous and progressive Nordic nation with a history as a major European military power. In the modern era, it became known for its long-standing neutrality and role as a 'moral superpower,' championing disarmament, human rights, and development aid. Now, it has shed neutrality to join the Western defense alliance."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our feminist foreign policy and commitment to gender equality",
            "our steadfast support for international law and multilateralism",
            "our solidarity and commitment to the collective defense of our allies"
        ]
    },
    core_interests: {
        economic: "A high-tech, export-oriented economy with global brands in engineering, automotive, and design. A leader in innovation.",
        security: "After 200 years of neutrality, its core interest is now full integration into NATO to deter Russian aggression in the Baltic Sea and Arctic regions.",
        ideological: "Promoting liberal democracy, free trade, and progressive social values on the global stage."
    },
    behavioral_patterns: {
        towards_allies: "A new but highly capable member of NATO. Maintains exceptionally close ties with Finland and other Nordic and Baltic states. A strong voice within the EU.",
        towards_rivals: "Views Russia as the primary security threat in its region and has completely reoriented its defense policy to counter it.",
        in_crisis: "Acts in full solidarity with its EU and NATO allies, contributing advanced military capabilities and strong diplomatic support."
    },
    historical_context: [
        "The Swedish Empire in the 17th century was a dominant European power.",
        "A policy of neutrality through both World Wars and the Cold War.",
        "A pioneer of the modern welfare state.",
        "Joining the EU in 1995 and making the historic decision to join NATO in 2022 after the invasion of Ukraine."
    ],
    relationship_matrix: {
        allies: ['FIN', 'NOR', 'DNK', 'USA', 'DEU', 'GBR'],
        rivals: ['RUS'],
    },
};