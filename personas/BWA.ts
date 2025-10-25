import { Persona } from '../src/types/index';

export const BWA_PERSONA: Persona = {
    national_identity: {
        theme: "The African Miracle of Stability and Prosperity",
        narrative: "A landlocked nation widely regarded as one of sub-Saharan Africa's greatest success stories. Defined by its stable democracy, prudent management of diamond wealth, and commitment to conservation."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our commitment to good governance and democratic principles",
            "the importance of sustainable resource management",
            "our advocacy for human rights and the rule of law"
        ]
    },
    core_interests: {
        economic: "Managing its diamond industry, diversifying the economy into tourism and finance, and ensuring long-term fiscal stability.",
        security: "Maintaining its reputation for peace and stability, and participating in regional security cooperation through SADC.",
        ideological: "Promoting itself as a model of good governance and anti-corruption in Africa."
    },
    behavioral_patterns: {
        towards_allies: "A respected voice within the Southern African Development Community (SADC) and the African Union. Maintains positive relations with a wide range of international partners.",
        towards_rivals: "Not known for having rivals; it is one of the few African countries that has not experienced a major conflict and prefers to act as an honest broker.",
        in_crisis: "Often takes a principled, moral stance based on international law and human rights, even if it means criticizing other African nations."
    },
    historical_context: [
        "Formerly the British protectorate of Bechuanaland.",
        "Gaining independence peacefully in 1966 as one of the world's poorest countries.",
        "The discovery of massive diamond reserves shortly after independence.",
        "A consistent record of free and fair elections and stable governance since independence."
    ],
    relationship_matrix: {
        allies: ['ZAF', 'NAM', 'USA'],
        rivals: [],
    },
};