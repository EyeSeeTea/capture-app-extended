import type { FilterOnly, FiltersOnly } from 'capture-core/components/ListView/types';
import { ExtendedFilters, ExtendedFiltersConfig } from 'capture-core/extended/filtersConfig.types';

export function getFiltersWithFiltersConfig(filters: FiltersOnly, filtersConfig: ExtendedFiltersConfig): ExtendedFilters {
    return filters.map((filter) => {
        const filterConfig = filtersConfig[filter.id] || {};
        return {
            ...filter,
            ...filterConfig,
        };
    });
}

export const hideFilter = (filtersConfig: ExtendedFiltersConfig) => (filter: FilterOnly) => {
    const filterConfig = filtersConfig[filter.id];
    return !filterConfig || !filterConfig.hidden;
};
