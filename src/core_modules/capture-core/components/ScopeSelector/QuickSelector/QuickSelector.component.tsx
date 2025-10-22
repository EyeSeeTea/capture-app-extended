import React from 'react';
import { useSetOuMode } from 'capture-core/components/ScopeSelector';
import { useLocationQuery } from 'capture-core/utils/routing';

import { SelectorBar } from '@dhis2/ui';
import { ProgramSelector } from './Program/ProgramSelector.component';
import { OrgUnitSelector } from './OrgUnitSelector.component';
import type { Props } from './QuickSelector.types';
import { OrgUnitModeSelector } from './OrgUnitModeSelector.component';

export const QuickSelector = ({
    selectedOrgUnitId,
    selectedProgramId,
    selectedCategories,
    selectedOrgUnit,
    previousOrgUnitId,
    onSetOrgUnit,
    onSetProgramId,
    onSetCategoryOption,
    onResetOrgUnitId,
    onResetProgramId,
    onResetCategoryOption,
    onResetAllCategoryOptions,
    formIsOpen,
    children,
    onStartAgain,
    isReadOnlyOrgUnit,
    orgUnitTooltip,
}: Props) => {
    const { setOuMode } = useSetOuMode();
    const { ouMode } = useLocationQuery();
    return (<SelectorBar
        disableClearSelections={!selectedProgramId && !selectedOrgUnitId}
        onClearSelectionClick={() => onStartAgain()}
    >
        <ProgramSelector
            selectedProgramId={selectedProgramId}
            selectedOrgUnitId={selectedOrgUnitId}
            selectedCategories={selectedCategories}
            handleClickProgram={onSetProgramId}
            handleSetCatergoryCombo={onSetCategoryOption}
            handleResetCategorySelections={onResetAllCategoryOptions}
            buttonModeMaxLength={5}
            onResetProgramId={onResetProgramId}
            onResetCategoryOption={onResetCategoryOption}
            onResetOrgUnit={onResetOrgUnitId}
            formIsOpen={formIsOpen}
        />
        <OrgUnitSelector
            previousOrgUnitId={previousOrgUnitId}
            selectedOrgUnitId={selectedOrgUnitId}
            handleClickOrgUnit={onSetOrgUnit}
            selectedOrgUnit={selectedOrgUnit}
            onReset={onResetOrgUnitId}
            isReadOnly={isReadOnlyOrgUnit}
            tooltip={orgUnitTooltip}
        />
        <OrgUnitModeSelector
            onClickOuMode={setOuMode}
            selectedOuMode={ouMode}
            isReadOnly={!selectedOrgUnitId}
        />
        {children}
    </SelectorBar>);
};
