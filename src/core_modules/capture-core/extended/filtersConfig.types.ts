type FilterConfig = {
  hidden?: boolean;
};

export type ExtendedFiltersConfig = Record<string, FilterConfig>;

export type BaseFilter = {
  id: string;
  header: string;
}
export type ExtendedFilters = Array<FilterConfig & BaseFilter>;

export type SetFiltersConfig = (filtersConfig: ExtendedFiltersConfig) => void;
