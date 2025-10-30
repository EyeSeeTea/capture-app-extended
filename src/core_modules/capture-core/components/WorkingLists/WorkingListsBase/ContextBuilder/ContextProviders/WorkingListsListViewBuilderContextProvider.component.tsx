import React, { useMemo } from 'react';
import { useFiltersConfig } from 'capture-core/extended/filtersConfig/FiltersConfigContext';
import {
    ListViewBuilderContext,
} from '../../workingListsBase.context';
import type { Props } from './workingListsListViewBuilderContextProvider.types';

export const WorkingListsListViewBuilderContextProvider = ({
    updating,
    updatingWithDialog,
    selectedRows,
    allRowsAreSelected,
    selectionInProgress,
    dataSource,
    onClickListRow,
    onRowSelect,
    onSelectAll,
    onSortList,
    onSetListColumnOrder,
    customRowMenuContents,
    onUpdateFilter,
    onClearFilter,
    onRemoveFilter,
    onSelectRestMenuItem,
    onChangePage,
    onChangeRowsPerPage,
    stickyFilters,
    programStageId,
    bulkActionBarComponent,
    children,
}: Props) => {
    const { filtersConfig, onSetFiltersConfig } = useFiltersConfig();

    const listViewBuilderContextData = useMemo(() => ({
        updating,
        updatingWithDialog,
        dataSource,
        selectedRows,
        allRowsAreSelected,
        selectionInProgress,
        onClickListRow,
        onRowSelect,
        onSelectAll,
        onSortList,
        onSetListColumnOrder,
        customRowMenuContents,
        onUpdateFilter,
        onClearFilter,
        onRemoveFilter,
        onSelectRestMenuItem,
        onChangePage,
        onChangeRowsPerPage,
        stickyFilters,
        programStageId,
        bulkActionBarComponent,
        filtersConfig,
        onSetFiltersConfig,
    }), [
        updating,
        updatingWithDialog,
        dataSource,
        selectedRows,
        allRowsAreSelected,
        selectionInProgress,
        onClickListRow,
        onRowSelect,
        onSelectAll,
        onSortList,
        onSetListColumnOrder,
        customRowMenuContents,
        onUpdateFilter,
        onClearFilter,
        onRemoveFilter,
        onSelectRestMenuItem,
        onChangePage,
        onChangeRowsPerPage,
        stickyFilters,
        programStageId,
        bulkActionBarComponent,
        filtersConfig,
        onSetFiltersConfig,
    ]);

    return (
        <ListViewBuilderContext.Provider
            value={listViewBuilderContextData}
        >
            {children}
        </ListViewBuilderContext.Provider>
    );
};
