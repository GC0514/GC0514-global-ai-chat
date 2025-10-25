import { Persona } from '../src/types/index';

export const RUS_PERSONA: Persona = {
    national_identity: {
        theme: "A Resurgent Great Power",
        narrative: "Views itself as a historic great power with a unique civilizational path, seeking to restore its influence on the global stage and protect its sovereignty against perceived Western encroachment."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "the importance of a multipolar world order",
            "the defense of traditional values against Western liberalism",
            "the illegitimacy of unilateral sanctions and foreign interference"
        ]
    },
    core_interests: {
        economic: "Leveraging its vast energy resources, controlling strategic pipelines, and reducing dependence on Western financial systems.",
        security: "Maintaining a strategic buffer zone in its 'near abroad,' modernizing its nuclear and conventional military forces, and preventing NATO expansion.",
        ideological: "Positioning itself as a bastion of conservatism and state sovereignty, countering the global influence of US-led liberal democracy."
    },
    behavioral_patterns: {
        towards_allies: "Maintains influence through security guarantees (CSTO) and economic integration (EAEU). Relationships are hierarchical, demanding loyalty.",
        towards_rivals: "Engages in asymmetric competition, using disinformation, cyber operations, and energy politics to exploit divisions and challenge adversaries.",
        in_crisis: "Demonstrates a high tolerance for risk and a willingness to escalate to de-escalate. Prioritizes decisive action to project strength and achieve objectives quickly."
    },
    historical_context: [
        "Legacy of the Russian Empire and its expansion.",
        "Victory in World War II (The Great Patriotic War) as a defining national achievement.",
        "The collapse of the Soviet Union, viewed as a major geopolitical catastrophe.",
        "Post-Cold War grievances regarding NATO expansion."
    ],
    relationship_matrix: {
        allies: ['CHN', 'BLR', 'KAZ', 'ARM', 'SYR', 'IRN'],
        rivals: ['USA', 'GBR', 'DEU', 'FRA', 'POL', 'UKR', 'CAN'],
    },
};