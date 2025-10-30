import React, { useMemo } from 'react';
import { areFilterConfigsEqual } from 'capture-core/extended/filtersConfig';
import { useViewHasTemplateChanges } from '../../WorkingListsCommon';
import { EventWorkingListsDataSourceSetup } from '../DataSourceSetup';
import type { Props } from './currentViewChangesResolver.types';

export const CurrentViewChangesResolver = ({
    filters,
    columns,
    sortById,
    sortByDirection,
    defaultColumns,
    initialViewConfig,
    currentTemplate,
    filtersConfig,
    ...passOnProps
}: Props) => {
    const viewHasTemplateChanges = useViewHasTemplateChanges({
        initialViewConfig,
        defaultColumns,
        filters,
        columns,
        sortById,
        sortByDirection,
    });

    const viewHasChanges = useMemo(() => viewHasTemplateChanges || !areFilterConfigsEqual(currentTemplate?.filtersConfig || {}, filtersConfig), [viewHasTemplateChanges, currentTemplate?.filtersConfig, filtersConfig]);

    return (
        <EventWorkingListsDataSourceSetup
            {...passOnProps}
            filters={filters}
            columns={columns}
            sortById={sortById}
            sortByDirection={sortByDirection}
            currentViewHasTemplateChanges={viewHasChanges}
            filtersConfig={filtersConfig}
            currentTemplate={currentTemplate}
        />
    );
};
