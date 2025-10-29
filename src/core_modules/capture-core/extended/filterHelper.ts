import { compact } from 'lodash';
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

export const hiddenFilters = (filtersConfig: ExtendedFiltersConfig) => (filter: BaseFilter) => {
    const filterConfig = filtersConfig[filter.id];
    return !filterConfig || !filterConfig.hidden;
};
