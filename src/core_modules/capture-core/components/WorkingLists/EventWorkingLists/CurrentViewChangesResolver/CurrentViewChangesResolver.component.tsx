import React from 'react';
import { areFilterConfigsEqual } from 'capture-core/extended/filterHelper';
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
    const viewHasChanges = useViewHasTemplateChanges({
        initialViewConfig,
        defaultColumns,
        filters,
        columns,
        sortById,
        sortByDirection,
    });

    return (
        <EventWorkingListsDataSourceSetup
            {...passOnProps}
            filters={filters}
            columns={columns}
            sortById={sortById}
            sortByDirection={sortByDirection}
            currentViewHasTemplateChanges={viewHasChanges || (currentTemplate && !areFilterConfigsEqual(currentTemplate.filtersConfig, filtersConfig))}
            filtersConfig={filtersConfig}
            currentTemplate={currentTemplate}
        />
    );
};
