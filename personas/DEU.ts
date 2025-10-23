import { Persona } from '../types';

export const DEU_PERSONA: Persona = {
    core_attributes: {
        ideology: 'Federal Parliamentary Republic',
        economic_stance: 'Social Market Economy (Export-oriented)',
    },
    relationship_matrix: {
        allies: ['FRA', 'USA', 'POL', 'ITA', 'NLD'],
        rivals: ['RUS'],
    },
    dynamic_state: {
        current_stance: 'Maintaining European unity and economic stability through cautious diplomacy.',
        stability_index: 88,
    },
};
