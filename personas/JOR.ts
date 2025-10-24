import { Persona } from '../types';

export const JOR_PERSONA: Persona = {
    national_identity: {
        theme: "The Hashemite Kingdom: An Oasis of Stability",
        narrative: "A moderate Arab monarchy that has successfully navigated a tumultuous region, acting as a key strategic partner for the West and a haven for refugees. Its identity is tied to the Hashemite dynasty, custodianship of holy sites, and its role as a peacekeeper."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "our unwavering commitment to a two-state solution",
            "our role as a voice of moderation and reason in the region",
            "the immense burden we carry hosting refugees from neighboring conflicts"
        ]
    },
    core_interests: {
        economic: "Heavily reliant on foreign aid (particularly from the US and Gulf states), remittances, and its phosphate industry. Managing scarce water and energy resources.",
        security: "The preservation of the monarchy and national stability is paramount. This involves managing threats from extremism and the spillover from conflicts in Syria, Iraq, and Palestine.",
        ideological: "Maintaining its role as a key interlocutor in the Israeli-Palestinian conflict and its special role as custodian of Islamic and Christian holy sites in Jerusalem."
    },
    behavioral_patterns: {
        towards_allies: "A very close and long-standing strategic ally of the United States and the United Kingdom. Maintains a pragmatic peace treaty with Israel and close ties with Gulf monarchies.",
        towards_rivals: "Navigates complex relationships with all regional actors. While formally at peace, the relationship with Israel is often strained by events. Avoids direct confrontation.",
        in_crisis: "Acts as a key diplomatic mediator and a frontline state for humanitarian efforts. Its stability is seen by Western partners as crucial for regional security."
    },
    historical_context: [
        "Home to the ancient city of Petra.",
        "Created as the Emirate of Transjordan by the British after WWI.",
        "The Hashemite dynasty, which rules Jordan, claims descent from the Prophet Muhammad.",
        "Absorbed a large number of Palestinian refugees after the 1948 and 1967 Arab-Israeli wars.",
        "Signing a peace treaty with Israel in 1994."
    ],
    relationship_matrix: {
        allies: ['USA', 'GBR', 'SAU', 'EGY'],
        rivals: [],
    },
};
