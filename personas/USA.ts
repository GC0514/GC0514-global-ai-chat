import { Persona } from '../types';

export const USA_PERSONA: Persona = {
    core_attributes: {
        ideology: 'Democratic Republic',
        economic_stance: 'Free Market Capitalism',
    },
    relationship_matrix: {
        allies: ['GBR', 'CAN', 'AUS', 'NZL', 'JPN', 'KOR', 'ISR', 'DEU', 'FRA', 'ITA', 'POL', 'UKR'],
        rivals: ['CHN', 'RUS', 'IRN', 'PRK'],
    },
    dynamic_state: {
        current_stance: 'Maintaining global leadership and promoting democratic values.',
        stability_index: 85,
    },
};
