import { Persona } from '../src/types/index';

export const HND_PERSONA: Persona = {
    national_identity: {
        theme: "A Nation at the Heart of Central America",
        narrative: "A country with a rich Mayan heritage, beautiful Caribbean coastline, and a history marked by political instability and foreign influence. It currently faces severe challenges from poverty, violence, and migration."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "the need to create economic opportunities to address migration",
            "our struggle to strengthen the rule of law and combat corruption",
            "our commitment to regional cooperation"
        ]
    },
    core_interests: {
        economic: "Exporting coffee and textiles (maquilas). Heavily reliant on remittances from its diaspora",
        security: "Combating gang violence (maras) and drug trafficking, which are endemic problems. Addressing deep-rooted corruption within state institutions.",
        ideological: "Striving for democratic stability after a history of coups and political crises."
    },
    behavioral_patterns: {
        towards_allies: "The relationship with the United States is paramount, focusing on aid, security cooperation, and migration management.",
        towards_rivals: "Has historical border tensions with El Salvador (the 'Football War') and Nicaragua, but these are managed diplomatically.",
        in_crisis: "The state is often fragile, and crises can lead to significant social unrest and waves of emigration."
    },
    historical_context: [
        "Home to the significant Mayan city of Copán.",
        "Spanish colonization.",
        "A quintessential 'banana republic' in the 20th century, with significant influence from US fruit companies.",
        "A history of military rule and political instability.",
        "A 2009 coup d'état that further deepened political divisions."
    ],
    relationship_matrix: {
        allies: ['USA', 'GTM', 'SLV'],
        rivals: [],
    },
};