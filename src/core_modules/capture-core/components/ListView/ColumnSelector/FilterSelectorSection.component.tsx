import React from 'react';
import {
    Checkbox,
    DataTable, DataTableCell,
    DataTableColumnHeader,
    DataTableRow,
    ModalContent,
    ModalTitle,
    TableBody,
    TableHead,
} from '@dhis2/ui';
import i18n from '@dhis2/d2-i18n';
import { ExtendedFilters } from 'capture-core/extended/filtersConfig.types';

type Props = {
  handleToggle: (id: string) => () => any;
  defaultFilters: ExtendedFilters;
}

export const FilterSelectorSection = ({ defaultFilters, handleToggle }: Props) => (<>
    <ModalTitle>{i18n.t('Default filters to hide')}</ModalTitle>
    <ModalContent>
        <DataTable>
            <TableHead>
                <DataTableRow>
                    <DataTableColumnHeader>{i18n.t('Column')}</DataTableColumnHeader>
                    <DataTableColumnHeader>{i18n.t('Visible')}</DataTableColumnHeader>
                </DataTableRow>
            </TableHead>
            <TableBody>
                {defaultFilters.map(item => (<DataTableRow key={item.id}>
                    <DataTableCell>{item.header}</DataTableCell>
                    <DataTableCell><Checkbox
                        checked={!item.hidden}
                        onChange={handleToggle(item.id)}
                        valid
                        dense
                    /></DataTableCell>
                </DataTableRow>))}
            </TableBody>
        </DataTable>
    </ModalContent>
</>);
