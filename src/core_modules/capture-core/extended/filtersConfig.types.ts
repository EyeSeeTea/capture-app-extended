type FilterConfig = {
  hidden?: boolean;
};

export type FiltersConfig = Record<string, FilterConfig>;
export type ExtendedTemplate = {
  filtersConfig: FiltersConfig;
};
export type ExtendedTemplates = Record<string, ExtendedTemplate>;

export type BaseFilter = {
  id: string;
  header: string;
}
export type FiltersWithConfig = Array<FilterConfig & BaseFilter>;

export type SetFiltersConfig = (filtersConfig: FiltersConfig) => void;
