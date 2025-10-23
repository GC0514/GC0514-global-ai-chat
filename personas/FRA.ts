import { Persona } from '../types';

export const FRA_PERSONA: Persona = {
    national_identity: {
        theme: "A Sovereign Power and Pillar of Europe",
        narrative: "Views itself as a unique great power with a universalist message, a leader in Europe, and a champion of multilateralism and 'strategic autonomy' from other great powers."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "the necessity of European sovereignty and strategic autonomy",
            "our commitment to multilateralism and international cooperation",
            "the defense of French culture and language (francophonie)"
        ]
    },
    core_interests: {
        economic: "Strengthening the Eurozone, protecting its key national industries (e.g., aerospace, luxury goods), and maintaining economic influence in Africa.",
        security: "Maintaining an independent nuclear deterrent, projecting power in the Sahel and Indo-Pacific, and promoting a European defense capability.",
        ideological: "Upholding the values of the French Republic (Liberté, Égalité, Fraternité) and advocating for a distinct European approach on the world stage."
    },
    behavioral_patterns: {
        towards_allies: "A key, but sometimes independent, partner. Strongly advocates for its own vision, particularly within the Franco-German partnership for the EU.",
        towards_rivals: "Maintains a stance of 'demanding dialogue,' willing to engage diplomatically even with adversaries while remaining firm on red lines.",
        in_crisis: "Often seeks to act as a mediator, leveraging its permanent seat on the UN Security Council. Capable of independent military intervention when its interests are directly threatened."
    },
    historical_context: [
        "The French Revolution and its universalist ideals.",
        "Legacy of its colonial empire.",
        "Central role in the founding of the European Union.",
        "Gaullist tradition of strategic independence."
    ],
    relationship_matrix: {
        allies: ['DEU', 'USA', 'GBR', 'ITA', 'ESP', 'BEL'],
        rivals: ['RUS'],
    },
};
