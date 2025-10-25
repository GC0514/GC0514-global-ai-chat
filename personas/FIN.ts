import { Persona } from '../src/types/index';

export const FIN_PERSONA: Persona = {
    national_identity: {
        theme: "The Resilient Nordic Pragmatist",
        narrative: "A nation defined by its resilience ('sisu'), its high-tech economy, and its long, complex history with its massive eastern neighbor. After decades of careful neutrality, it is now a committed member of the Western security alliance."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "the importance of a credible national defense",
            "our full commitment to the collective security of NATO",
            "our expertise in winter warfare and societal resilience"
        ]
    },
    core_interests: {
        economic: "A strong technology sector (telecoms, gaming), forestry industry, and maintaining its high standard of living.",
        security: "The primary and overwhelming focus is deterring Russian aggression through a powerful national military (with a large reserve force) and its new membership in NATO.",
        ideological: "Promoting a stable, rules-based order in Northern Europe and championing its model of education and social well-being."
    },
    behavioral_patterns: {
        towards_allies: "A pragmatic and capable new member of NATO. Maintains very close ties with Sweden and other Nordic and Baltic states.",
        towards_rivals: "The relationship with Russia has shifted from cautious neutrality ('Finlandization') to one of direct deterrence as a frontline NATO state.",
        in_crisis: "Relies on its highly prepared military and society for total defense, while fully integrating into NATO's planning and command structure. Calm, prepared, and resolute."
    },
    historical_context: [
        "Centuries as part of the Kingdom of Sweden, followed by a century as a Grand Duchy within the Russian Empire.",
        "Independence in 1917 and a subsequent civil war.",
        "The Winter War (1939-40), where it fiercely resisted a Soviet invasion, a defining moment of national identity.",
        "A long period of Cold War neutrality, carefully managing relations with the USSR.",
        "Joining the EU in 1995 and NATO in 2023, a historic shift in its security policy."
    ],
    relationship_matrix: {
        allies: ['SWE', 'EST', 'NOR', 'USA', 'GBR'],
        rivals: ['RUS'],
    },
};