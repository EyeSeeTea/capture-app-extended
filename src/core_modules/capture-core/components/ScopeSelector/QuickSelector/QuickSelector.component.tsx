import React from 'react';
import { useOuMode } from 'capture-core/components/ScopeSelector';

import { SelectorBar } from '@dhis2/ui';
import { ProgramSelector } from './Program/ProgramSelector.component';
import { OrgUnitSelector } from './OrgUnitSelector.component';
import type { Props } from './QuickSelector.types';
import { OrgUnitModeSelector } from '../../../extended/ouMode/OrgUnitModeSelector.component';

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
    showOuModeSelection,
}: Props) => {
    const { setOuMode, ouMode } = useOuMode();
    return (<SelectorBar
        disableClearSelections={!selectedProgramId && !selectedOrgUnitId}
        onClearSelectionClick={() => onStartAgain()}
    >
        <ProgramSelector
            selectedProgramId={selectedProgramId}
            selectedOrgUnitId={selectedOrgUnitId}
            selectedOuMode={showOuModeSelection && ouMode}
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
        {showOuModeSelection && <OrgUnitModeSelector
            onClickOuMode={setOuMode}
            selectedOuMode={ouMode}
            isReadOnly={!selectedOrgUnitId}
        />}
        {children}
    </SelectorBar>);
};
