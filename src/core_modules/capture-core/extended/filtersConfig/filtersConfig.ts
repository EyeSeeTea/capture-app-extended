import { compact, isEqual } from 'lodash';
import { BaseFilter, FiltersWithConfig, FiltersConfig } from './filtersConfig.types';

// default filters generated for event and tracker programs
export const defaultFilters = [
    'programStatus',
    'enrolledAt',
    'eventOccurredAt',
    'status',
    'createdAt',
    'occurredAt',
];

export function getFiltersWithFiltersConfig(filters: FiltersWithConfig, filtersConfig: FiltersConfig): FiltersWithConfig {
    return compact(filters.map((filter) => {
        const filterConfig = filtersConfig[filter.id] || {};

        if (defaultFilters.includes(filter.id)) {
            return {
                ...filter,
                ...filterConfig,
            };
        }
        return undefined;
    }));
}

export function isFilterVisible(filtersConfig: FiltersConfig) {
    return (filter: BaseFilter) => {
        const filterConfig = filtersConfig[filter.id];
        return !filterConfig || !filterConfig.hidden;
    };
}

export function areFilterConfigsEqual(initial: FiltersConfig, updated: FiltersConfig) {
    return isEqual(initial, updated);
}
