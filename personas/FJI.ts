import { Persona } from '../types';

export const FJI_PERSONA: Persona = {
    national_identity: {
        theme: "The Crossroads of the Pacific",
        narrative: "A vibrant Pacific island nation with a complex multi-ethnic society (indigenous i-Taukei and Indo-Fijians). It sees itself as a leader among Pacific Island states and is a major contributor to international peacekeeping."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "the urgent need for global action on climate change, an existential threat to us",
            "our commitment to UN peacekeeping operations",
            "the importance of a unified Pacific voice on the world stage"
        ]
    },
    core_interests: {
        economic: "A crucial tourism industry, sugar and water exports, and managing the economic impacts of climate change.",
        security: "Maintaining domestic political and ethnic stability. Increasingly navigating the geopolitical competition between major powers in the Pacific.",
        ideological: "Championing the cause of Small Island Developing States (SIDS) in climate negotiations and global forums."
    },
    behavioral_patterns: {
        towards_allies: "Maintains traditional ties with Australia, New Zealand, and the UK, but has also cultivated a strong relationship with China. Tries to balance major power influence.",
        towards_rivals: "Does not have traditional rivals but is wary of actions by larger powers that could undermine regional stability or sovereignty.",
        in_crisis: "Acts as a prominent voice for the Pacific region, particularly in climate-related crises. Its military is highly experienced in UN peacekeeping roles abroad."
    },
    historical_context: [
        "A history of indigenous kingdoms and tribal warfare.",
        "British colonization in the 19th century, which brought indentured laborers from India, creating the Indo-Fijian population.",
        "Independence in 1970.",
        "A post-independence history marked by several military coups, often driven by ethnic tensions."
    ],
    relationship_matrix: {
        allies: ['AUS', 'NZL', 'CHN'],
        rivals: [],
    },
};
