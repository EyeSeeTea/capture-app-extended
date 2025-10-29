import React, { useState, useEffect } from 'react';
import { isEqual } from 'lodash';
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    Button,
    TabBar,
    Tab,
    IconFilter16, IconLayoutColumns16,
} from '@dhis2/ui';
import i18n from '@dhis2/d2-i18n';

import { FilterSelectorSection } from 'capture-core/components/ListView/ColumnSelector/FilterSelectorSection.component';
import { FiltersWithConfig } from 'capture-core/extended/filtersConfig.types';
import { DragDropList } from './DragDropList';
import { Columns } from '../types';

type Props = {
    open: boolean | null;
    onClose: () => void;
    onSave: (columns: Columns, defaultFilters?: FiltersWithConfig) => void;
    columns: Columns;
    defaultFilters: FiltersWithConfig

};

const tabBarStyle = {
    marginBottom: '16px',
};

export const ColumnSelectorDialog = ({ columns, defaultFilters, open, onClose, onSave }: Props) => {
    const [columnList, setColumnList] = useState(columns);
    const [filterList, setFilterList] = useState(defaultFilters || []);
    const [tab, setTab] = useState<'column'|'filter'>('column');

    useEffect(() => {
        setColumnList(currentColumns => (isEqual(columns, currentColumns) ? currentColumns : columns));
    }, [columns]);

    useEffect(() => {
        setFilterList(currentFilters => (isEqual(defaultFilters, currentFilters) ? currentFilters : defaultFilters));
    }, [defaultFilters]);

    const handleSave = () => {
        onSave(columnList, filterList);
    };

    const handleToggle = (id: string) => () => {
        const index = columnList.findIndex(column => column.id === id);
        const toggleList = [...columnList];

        toggleList[index] = { ...toggleList[index], visible: !toggleList[index].visible };
        setColumnList(toggleList);
    };

    const handleFilterToggle = (id: string) => () => {
        const index = filterList.findIndex(filter => filter.id === id);
        const toggleList = [...filterList];

        toggleList[index] = { ...toggleList[index], hidden: !toggleList[index].hidden };
        setFilterList(toggleList);
    };

    const handleUpdateListOrder = (sortedList: Columns) => {
        setColumnList(sortedList);
    };

    if (!open) {
        return null;
    }

    return (
        <span>
            <Modal
                hide={!open}
                onClose={onClose}
                dataTest={'column-selector-dialog'}
            >

                {defaultFilters &&
                <div style={tabBarStyle}>
                    <TabBar >
                        <Tab
                            onClick={() => setTab('column')}
                            icon={<IconLayoutColumns16 />}
                            selected={tab === 'column'}
                        >
                            {i18n.t('Columns')}
                        </Tab>
                        <Tab
                            onClick={() => setTab('filter')}
                            icon={<IconFilter16 />}
                            selected={tab === 'filter'}
                        >
                            {i18n.t('Filters')}
                        </Tab>
                    </TabBar>
                </div>}

                {tab === 'column' && <>
                    <ModalTitle>{i18n.t('Columns to show in table')}</ModalTitle>
                    <ModalContent>
                        <DragDropList
                            listItems={columnList}
                            handleUpdateListOrder={handleUpdateListOrder}
                            handleToggle={handleToggle}
                        />
                    </ModalContent>
                </>}
                {tab === 'filter' && defaultFilters && <>
                    <FilterSelectorSection
                        defaultFilters={filterList}
                        handleToggle={handleFilterToggle}
                    />
                </>}
                <ModalActions>
                    <Button onClick={handleSave} primary initialFocus>
                        {i18n.t('Save')}
                    </Button>
                </ModalActions>
            </Modal>
        </span>
    );
};
