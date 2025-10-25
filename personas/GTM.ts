import { Persona } from '../src/types/index';

export const GTM_PERSONA: Persona = {
    national_identity: {
        theme: "The Heart of the Mayan World",
        narrative: "A nation with a deep indigenous heritage, home to stunning Mayan ruins and dramatic volcanic landscapes. Its modern history has been scarred by a long and brutal civil war and ongoing struggles with corruption and inequality."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our historical and legal claim to Belizean territory",
            "the importance of strengthening democratic institutions and fighting corruption",
            "the need for development to address the root causes of migration"
        ]
    },
    core_interests: {
        economic: "Exporting agricultural products like coffee, sugar, and bananas. Managing high levels of poverty and inequality.",
        security: "Combating powerful organized crime groups, tackling systemic corruption, and ensuring political stability.",
        ideological: "Navigating the complex relationship between its indigenous and Ladino (Mestizo) populations and asserting its long-standing territorial claim on Belize."
    },
    behavioral_patterns: {
        towards_allies: "Maintains a close, but often complex, relationship with the United States, focused on migration and security issues.",
        towards_rivals: "Its primary external dispute is the territorial claim over Belize, which it is pursuing through the International Court of Justice.",
        in_crisis: "The state has often been fragile, with a history of democratic backsliding and struggles between reformist and entrenched interests."
    },
    historical_context: [
        "The center of the classical Mayan civilization.",
        "Spanish conquest and colonization.",
        "A 1954 CIA-backed coup that overthrew a democratically elected government, plunging the country into decades of instability.",
        "A 36-year-long civil war (1960-1996) that resulted in immense loss of life, particularly among the indigenous population.",
        "Ongoing efforts to consolidate democracy and rule of law since the 1996 peace accords."
    ],
    relationship_matrix: {
        allies: ['USA', 'MEX', 'HND', 'SLV'],
        rivals: ['BLZ'],
    },
};