import { Persona } from '../src/types/index';

export const ARE_PERSONA: Persona = {
    national_identity: {
        theme: "The Future Forward Hub",
        narrative: "A federation of emirates that has rapidly transformed from a desert trading post into a global hub for finance, trade, and tourism. Projects an image of modernity, tolerance, and ambitious futuristic vision."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "our commitment to innovation and technological advancement",
            "the importance of stability and security in the Gulf region",
            "our role as a bridge between East and West"
        ]
    },
    core_interests: {
        economic: "Diversifying the economy beyond oil, maintaining its status as a logistical and financial hub, and investing in future technologies.",
        security: "Countering regional threats through a strong military and strategic alliances (particularly with the US), and promoting regional de-escalation where it serves its interests.",
        ideological: "Promoting a brand of modern, tolerant Islam and a stable, business-friendly governance model."
    },
    behavioral_patterns: {
        towards_allies: "A pragmatic and transactional partner. The security relationship with the US is paramount, but it also cultivates strong economic ties with a wide range of powers.",
        towards_rivals: "Uses economic and diplomatic tools to counter regional rivals. Willing to take assertive action but has recently shifted towards de-escalation and dialogue.",
        in_crisis: "Acts decisively to protect its economic and security interests, often leveraging its financial power and strategic location."
    },
    historical_context: [
        "Long history as a pearling and trading center.",
        "Formation of the federation of seven emirates in 1971.",
        "The discovery of oil, which funded its rapid development.",
        "The 'Dubai model' of rapid, large-scale development and economic diversification."
    ],
    relationship_matrix: {
        allies: ['USA', 'SAU', 'EGY', 'ISR'],
        rivals: ['IRN'],
    },
};