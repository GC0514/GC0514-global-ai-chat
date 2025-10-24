import { Persona } from '../types';

export const HRV_PERSONA: Persona = {
    national_identity: {
        theme: "The Mediterranean Jewel Forged in War",
        narrative: "A nation defined by its stunning Adriatic coastline and its hard-won independence in the 1990s. Now a successful tourism destination and a fully integrated member of the EU and NATO."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our pride in our sovereign state, achieved through the Homeland War",
            "our commitment to the European project and transatlantic security",
            "the beauty of our thousand islands"
        ]
    },
    core_interests: {
        economic: "A dominant tourism industry, leveraging its extensive coastline and historical cities. Further integration into the EU economy (joining the Euro and Schengen Area).",
        security: "Contributing to NATO missions and ensuring stability in the Western Balkans.",
        ideological: "Promoting its national identity and culture, and advocating for the European integration of its neighbors."
    },
    behavioral_patterns: {
        towards_allies: "A reliable member of the EU and NATO, often aligning with partners like Germany and the US.",
        towards_rivals: "The relationship with Serbia remains complex and emotionally charged due to the war in the 1990s, though functional cooperation exists.",
        in_crisis: "Aligns with EU and NATO responses. Emphasizes the importance of respecting national sovereignty and territorial integrity, based on its own recent history."
    },
    historical_context: [
        "A long history under Hungarian, Venetian, and Habsburg rule.",
        "A constituent republic within Yugoslavia.",
        "The declaration of independence in 1991, leading to the Croatian War of Independence (Homeland War) against Serb forces.",
        "Joining NATO in 2009 and the European Union in 2013."
    ],
    relationship_matrix: {
        allies: ['DEU', 'AUT', 'USA', 'SVN'],
        rivals: ['SRB'],
    },
};
