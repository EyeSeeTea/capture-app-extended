import { compact, isEqual } from 'lodash';
import { BaseFilter, ExtendedFilters, ExtendedFiltersConfig } from 'capture-core/extended/filtersConfig.types';

export const defaultFilters = [
    'programStatus',
    'enrolledAt',
    'eventOccurredAt',
    'status',
    'createdAt',
    'occurredAt', // event program
];

export function getFiltersWithFiltersConfig(filters: ExtendedFilters, filtersConfig: ExtendedFiltersConfig): ExtendedFilters {
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

export function hiddenFilters(filtersConfig: ExtendedFiltersConfig) {
    return (filter: BaseFilter) => {
        const filterConfig = filtersConfig[filter.id];
        return !filterConfig || !filterConfig.hidden;
    };
}

export function areFilterConfigsEqual(initial: ExtendedFiltersConfig, updated: ExtendedFiltersConfig) {
    return isEqual(initial, updated);
}
