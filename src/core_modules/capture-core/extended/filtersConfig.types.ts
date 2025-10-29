import { FilterOnly } from 'capture-core/components/ListView/types';

type FilterConfig = {
  hidden?: boolean;
};

export type ExtendedFiltersConfig = Record<string, FilterConfig>;


export type ExtendedFilter = FilterOnly & FilterConfig;
export type ExtendedFilters = Array<ExtendedFilter>;

export type SetFiltersConfig = (filtersConfig: ExtendedFiltersConfig) => void;
