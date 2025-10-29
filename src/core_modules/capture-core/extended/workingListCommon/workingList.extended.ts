import { actionCreator } from 'capture-core/actions/actions.utils';
import { FiltersConfig } from 'capture-core/extended/filtersConfig.types';

export const extendedWorkingListsCommonActionTypes = {
    FILTERS_CONFIG_SET: 'WorkingListFiltersConfigSet',
};

export const setFiltersConfig = (filtersConfig: FiltersConfig, storeId: string) =>
    actionCreator(extendedWorkingListsCommonActionTypes.FILTERS_CONFIG_SET)({ filtersConfig, storeId });
