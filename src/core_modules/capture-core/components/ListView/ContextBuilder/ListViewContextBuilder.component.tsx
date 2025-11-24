import React, { useMemo } from 'react';
import { useFiltersConfig } from 'capture-core/extended/filtersConfig';
import {
    FilterValuesContext,
    PaginationContext,
} from '../listView.context';
import { ListViewMain } from '../Main';
import type { Props } from './listViewContextBuilder.types';
import type { PaginationContextData } from '../types';

export const ListViewContextBuilder = ({
    filters,
    selectedRows,
    allRowsAreSelected,
    onRowSelect,
    onSelectAll,
    selectionInProgress,
    onChangePage,
    onChangeRowsPerPage,
    rowsPerPage,
    currentPage,
    dataSource,
    ...passOnProps
}: Props) => {
    const { filtersConfig, onSetFiltersConfig } = useFiltersConfig();
    const paginationContextData = useMemo((): PaginationContextData => ({
        onChangePage,
        onChangeRowsPerPage,
        rowsPerPage,
        currentPage,
        rowCountPage: dataSource.length,
    }), [
        onChangePage,
        onChangeRowsPerPage,
        rowsPerPage,
        currentPage,
        dataSource.length,
    ]);

    return (
        <FilterValuesContext.Provider
            value={filters}
        >
            <PaginationContext.Provider
                value={paginationContextData}
            >
                <ListViewMain
                    {...passOnProps}
                    filtersConfig={filtersConfig}
                    onSetFiltersConfig={onSetFiltersConfig}
                    dataSource={dataSource}
                    selectedRows={selectedRows}
                    allRowsAreSelected={allRowsAreSelected}
                    onRowSelect={onRowSelect}
                    onSelectAll={onSelectAll}
                    isSelectionInProgress={selectionInProgress}
                />
            </PaginationContext.Provider>
        </FilterValuesContext.Provider>
    );
};

