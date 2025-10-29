import * as React from 'react';
import { FiltersConfig } from 'capture-core/extended/filtersConfig.types';
import { FiltersRows } from '../Filters';
import type { Columns, FiltersOnly, AdditionalFilters, UpdateFilter, ClearFilter, RemoveFilter, StickyFilters } from '../types';

type Props = {
    columns: Columns,
    filtersOnly?: FiltersOnly,
    additionalFilters?: AdditionalFilters,
    onUpdateFilter: UpdateFilter;
    onClearFilter: ClearFilter;
    onRemoveFilter: RemoveFilter;
    onSelectRestMenuItem: (filterId: string, item: any) => void;
    stickyFilters: StickyFilters,
    programStageId?: string,
    filtersConfig: FiltersConfig;
};

export const withFilters = () => <P extends Record<string, unknown>>(InnerComponent: React.ComponentType<P>) =>
    ({
        columns,
        filtersOnly,
        additionalFilters,
        filtersConfig,
        onUpdateFilter,
        onClearFilter,
        onRemoveFilter,
        onSelectRestMenuItem,
        stickyFilters,
        programStageId,
        ...passOnProps
    }: Props & P) => (
        <InnerComponent
            {...passOnProps as unknown as P}
            columns={columns}
            filtersOnly={filtersOnly}
            additionalFilters={additionalFilters}
            filtersConfig={filtersConfig}
            filters={
                <FiltersRows
                    columns={columns}
                    programStageId={programStageId}
                    filtersOnly={filtersOnly}
                    additionalFilters={additionalFilters}
                    onUpdateFilter={onUpdateFilter}
                    onClearFilter={onClearFilter}
                    onRemoveFilter={onRemoveFilter}
                    onSelectRestMenuItem={onSelectRestMenuItem}
                    stickyFilters={stickyFilters}
                    filtersConfig={filtersConfig}
                />}
        />
    );
