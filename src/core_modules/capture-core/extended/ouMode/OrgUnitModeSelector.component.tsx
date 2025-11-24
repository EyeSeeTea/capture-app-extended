import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { withStyles, WithStyles } from '@material-ui/core/styles';
// @ts-expect-error - SelectorBarItem is available at runtime, but its TypeScript definition is not exposed by the UI library
import { Menu, MenuItem, SelectorBarItem, spacers } from '@dhis2/ui';
import { ConditionalTooltip } from '../../components/Tooltips/ConditionalTooltip';

const ouModeOptions = {
    SELECTED: {
        value: 'SELECTED',
        label: i18n.t('Selected'),
    },
    CHILDREN: {
        value: 'CHILDREN',
        label: i18n.t('Children'),
    },
    DESCENDANTS: {
        value: 'DESCENDANTS',
        label: i18n.t('Descendants'),
    },
};

const styles = () => ({
    selectBarMenu: {
        minWidth: '150px',
        maxHeight: '80vh',
        overflow: 'auto',
        minHeight: spacers.dp96,
    },
});

type OrgUnitModeSelectorProps = {
  onClickOuMode: (ouMode: string) => void;
  selectedOuMode: string;
  isReadOnly?: boolean;
} & WithStyles<typeof styles>;

export const OrgUnitModeSelectorPlain: React.FC<OrgUnitModeSelectorProps> = ({
    onClickOuMode,
    selectedOuMode,
    classes,
    isReadOnly = false,
}) => {
    const [open, setOpen] = useState(false);

    const handleClick = (selectedMode: string) => {
        setOpen(false);
        onClickOuMode(selectedMode);
    };

    return (
        <ConditionalTooltip
            enabled={Boolean(isReadOnly)}
            content={i18n.t('Choose an organisation unit before selecting the ouMode.')}
        >
            <SelectorBarItem
                label={i18n.t('ouMode')}
                noValueMessage={isReadOnly ? i18n.t('None selected') : i18n.t('Choose an organisation unit')}
                value={ouModeOptions[selectedOuMode]?.label}
                open={!isReadOnly && open}
                setOpen={setOpen}
                displayOnly={isReadOnly}
                dataTest="org-unit-selector-container"
            >
                <div className={classes.selectBarMenu}>
                    <Menu>
                        {Object.values(ouModeOptions).map(option => (
                            <MenuItem
                                key={option.value}
                                dense
                                onClick={() => handleClick(option.value)}
                                label={option.label}
                                suffix=""
                            />
                        ))}
                    </Menu>
                </div>
            </SelectorBarItem>
        </ConditionalTooltip>
    );
};

export const OrgUnitModeSelector = withStyles(styles)(OrgUnitModeSelectorPlain);
