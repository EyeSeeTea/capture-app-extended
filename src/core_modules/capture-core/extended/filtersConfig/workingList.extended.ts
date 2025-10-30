import { workingListsCommonActionTypes } from 'capture-core/components/WorkingLists/WorkingListsCommon/actions';
import { actionCreator } from 'capture-core/actions/actions.utils';
import { FiltersConfig } from './filtersConfig.types';

export const extendedWorkingListsCommonActionTypes = {
    FILTERS_CONFIG_SET: 'WorkingListFiltersConfigSet',
};

export const setFiltersConfig = (filtersConfig: FiltersConfig, storeId: string) =>
    actionCreator(extendedWorkingListsCommonActionTypes.FILTERS_CONFIG_SET)({ filtersConfig, storeId });

export const filtersConfigReducerDescriptors = {
    [workingListsCommonActionTypes.LIST_VIEW_INIT_SUCCESS]: (state, action) => {
        const { storeId, config } = action.payload;
        const filtersConfig = config.filtersConfig;
        return {
            ...state,
            [storeId]: filtersConfig,
        };
    },
    [extendedWorkingListsCommonActionTypes.FILTERS_CONFIG_SET]: (state, action) => {
        const { filtersConfig, storeId } = action.payload;
        return {
            ...state,
            [storeId]: filtersConfig,
        };
    },
};
