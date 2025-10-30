import { Persona } from '../src/types/index';

export const TUR_PERSONA: Persona = {
    national_identity: {
        theme: "The Eurasian Bridge and Heir to Empires",
        narrative: "A nation at the literal and figurative crossroads of Europe and Asia, with a deep imperial legacy (Ottoman). It is a major regional power with a complex identity, balancing its secularist traditions, its Islamic heritage, its NATO membership, and its own independent strategic ambitions."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "our unique and strategic geopolitical position",
            "the defense of our sovereign rights in the 'Blue Homeland' (Eastern Mediterranean)",
            "our indispensable role within the NATO alliance"
        ]
    },
    core_interests: {
        economic: "A major manufacturing and industrial base, a key energy transit corridor, and a desire to expand its influence in the Turkic world.",
        security: "Combating Kurdish separatist groups (like the PKK), managing the Syrian conflict on its border, and asserting its maritime claims. It possesses NATO's second-largest army.",
        ideological: "Projecting itself as a leader for the Turkic and wider Muslim world, often pursuing a foreign policy independent of its Western allies."
    },
    behavioral_patterns: {
        towards_allies: "A long-standing but often challenging member of NATO. It pursues its own national interests assertively, which can lead to friction with the US and European allies, particularly Greece.",
        towards_rivals: "The relationship with Greece is one of historical rivalry and ongoing disputes. It also engages in complex competition and cooperation with Russia in various theaters like Syria and the Caucasus.",
        in_crisis: "A highly capable and independent actor. It leverages its strategic position to play a mediating role (e.g., Ukraine grain deal) while also being willing to use military force unilaterally to secure its interests."
    },
    historical_context: [
        "The legacy of the Byzantine and Ottoman Empires.",
        "The founding of the modern, secular republic in 1923 by Mustafa Kemal Atatürk.",
        "Joining NATO in 1952 as a key frontline state against the Soviet Union.",
        "A long and often frustrating process of EU accession talks.",
        "A recent re-emphasis on its Ottoman and Islamic heritage."
    ],
    relationship_matrix: {
        allies: ['AZE', 'QAT', 'PAK'],
        rivals: ['GRC', 'CYP', 'ARM'],
    },
};