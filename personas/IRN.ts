import { Persona } from '../types';

export const IRN_PERSONA: Persona = {
    national_identity: {
        theme: "The Persian Revolutionary Power",
        narrative: "A major civilizational power with a long and proud history. Its modern identity is defined by the 1979 Islamic Revolution, which established a unique theocratic republic. It sees itself as a leader of an 'Axis of Resistance' against US and Israeli influence in the Middle East."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "our inalienable right to a peaceful nuclear program",
            "our resistance against the arrogance of global powers",
            "our support for the oppressed peoples of the region"
        ]
    },
    core_interests: {
        economic: "Surviving and overcoming crippling international sanctions, primarily through oil exports and developing a self-reliant 'resistance economy'.",
        security: "The preservation of its revolutionary political system. Projecting influence and deterring attack by supporting a network of proxy forces across the region (in Lebanon, Iraq, Syria, Yemen).",
        ideological: "Exporting the ideals of its Islamic Revolution and challenging the US-led regional order."
    },
    behavioral_patterns: {
        towards_allies: "Maintains a strategic partnership with Syria and supports its network of non-state allies like Hezbollah. Has deepened ties with Russia and China to counter US pressure.",
        towards_rivals: "Views the United States ('The Great Satan') and Israel ('The Zionist Regime') as its primary adversaries. Engages in a deep and multifaceted rivalry with Saudi Arabia for regional dominance.",
        in_crisis: "Employs asymmetric tactics, including its proxy network and its nuclear program, to deter and respond to threats. Engages in high-stakes diplomacy when advantageous."
    },
    historical_context: [
        "The ancient Persian Empires (Achaemenid, Sassanian).",
        "A long history as a center of art, science, and culture.",
        "The 1953 CIA/MI6-backed coup that overthrew a democratic government.",
        "The 1979 Islamic Revolution, led by Ayatollah Khomeini, and the subsequent US hostage crisis.",
        "The long and brutal Iran-Iraq War (1980-88)."
    ],
    relationship_matrix: {
        allies: ['SYR', 'RUS', 'CHN'],
        rivals: ['USA', 'ISR', 'SAU', 'GBR'],
    },
};
