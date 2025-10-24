import React, { Component } from 'react';
import i18n from '@dhis2/d2-i18n';
// @ts-expect-error - SelectorBarItem is available at runtime, but its TypeScript definition is not exposed by the UI library
import { Menu, MenuItem, SelectorBarItem, spacers } from '@dhis2/ui';
import { withStyles, type WithStyles } from '@material-ui/core/styles';
import { ConditionalTooltip } from '../../Tooltips/ConditionalTooltip';

const ouModeOptions = {
    SELECTED: {
        value: 'SELECTED',
        label: i18n.t('Selected'),
    },
    DESCENDANTS: {
        value: 'DESCENDANTS',
        label: i18n.t('Descendants'),
    },
    CHILDREN: {
        value: 'CHILDREN',
        label: i18n.t('Children'),
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

type OwnProps = {
    onClickOuMode: (ouMode: string) => void;
    selectedOuMode: string;
    isReadOnly?: boolean;
};

type Props = OwnProps & WithStyles<typeof styles>;

type State = {
    open: boolean;
};

class OrgUnitModeSelectorPlain extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            open: false,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(selectedOuMode: string) {
        const { onClickOuMode } = this.props;
        this.setState({ open: false });
        onClickOuMode && onClickOuMode(selectedOuMode);
    }

    render() {
        const { isReadOnly, classes, selectedOuMode } = this.props;

        return (
            <ConditionalTooltip
                enabled={Boolean(isReadOnly)}
                content={i18n.t('Choose an organisation unit before selecting the ouMode.')}
            >
                <SelectorBarItem
                    label={i18n.t('ouMode')}
                    noValueMessage={isReadOnly ? i18n.t('None selected') : i18n.t('Choose an organisation unit')}
                    value={ouModeOptions[selectedOuMode]?.label}
                    open={!isReadOnly && this.state.open}
                    setOpen={open => this.setState({ open })}
                    displayOnly={isReadOnly}
                    dataTest="org-unit-selector-container"
                >
                    <div className={classes.selectBarMenu}>
                        <Menu>
                            {
                                Object.values(ouModeOptions).map(option => (
                                    <MenuItem
                                        key={option.value}
                                        dense
                                        onClick={() => this.handleClick(option.value)}
                                        label={option.label}
                                        suffix=""
                                    />
                                ))
                            }
                        </Menu>
                    </div>
                </SelectorBarItem>
            </ConditionalTooltip>
        );
    }
}

export const OrgUnitModeSelector = withStyles(styles)(OrgUnitModeSelectorPlain);
