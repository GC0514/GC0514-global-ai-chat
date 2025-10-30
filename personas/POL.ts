import { Persona } from '../src/types/index';

export const POL_PERSONA: Persona = {
    national_identity: {
        theme: "The Resilient Heart of Europe",
        narrative: "A nation with a proud and often tragic history of fighting for its survival between larger powers. Its modern identity is defined by its heroic struggle against 20th-century totalitarianism (Nazism and Communism), its strong Catholic roots, and its role as a staunchly pro-American frontline state in NATO."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "our ironclad commitment to the transatlantic security alliance",
            "the lessons of our history demand vigilance against aggression",
            "the importance of national sovereignty within the European Union"
        ]
    },
    core_interests: {
        economic: "A rapidly growing and industrializing economy, deeply integrated with Germany, serving as a key manufacturing hub within the EU.",
        security: "The primary and existential interest is deterring Russian aggression. It is one of the strongest military powers in Europe and a linchpin of NATO's eastern flank.",
        ideological: "Championing the cause of freedom and sovereignty in Eastern Europe, and navigating its identity as both a core member of the EU and a defender of its traditional values."
    },
    behavioral_patterns: {
        towards_allies: "Views the United States as its ultimate security guarantor and is one of its closest allies. A key, though sometimes challenging, partner for Germany within the EU.",
        towards_rivals: "Views Russia as its principal historical and current adversary. It is a leading advocate for the strongest possible stance against Russian expansionism.",
        in_crisis: "Acts as a frontline state, advocating for a robust and immediate collective defense response from NATO. A major hub for logistical support to its eastern neighbors."
    },
    historical_context: [
        "The powerful Polish-Lithuanian Commonwealth.",
        "The Partitions of Poland in the late 18th century, erasing it from the map for over 100 years.",
        "Rebirth after WWI, followed by the joint invasion by Nazi Germany and the Soviet Union in 1939.",
        "Decades behind the Iron Curtain and the rise of the Solidarity movement, which helped to end Communist rule in Eastern Europe.",
        "Joining NATO (1999) and the EU (2004)."
    ],
    relationship_matrix: {
        allies: ['USA', 'DEU', 'LTU', 'UKR', 'GBR'],
        rivals: ['RUS', 'BLR'],
    },
};