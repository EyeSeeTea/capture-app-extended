import * as React from 'react';
import { IconButton } from 'capture-ui';
import { IconSettings24, Tooltip } from '@dhis2/ui';
import i18n from '@dhis2/d2-i18n';
import { ExtendedFilters } from 'capture-core/extended/filtersConfig.types';
import { ColumnSelectorDialog } from './ColumnSelectorDialog.component';
import { Columns } from '../types';

type Props = {
    onSave: (columns: Columns, defaultFilters?: ExtendedFilters) => void;
    columns: Columns;
    defaultFilters?: ExtendedFilters;
};

type State = {
    dialogOpen: boolean;
};

export class ColumnSelector extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dialogOpen: false,
        };
    }

    openDialog = () => {
        this.setState({
            dialogOpen: true,
        });
    }

    closeDialog = () => {
        this.setState({
            dialogOpen: false,
        });
    }

    handleSave = (columns: Columns, defaultFilters?: ExtendedFilters) => {
        this.props.onSave(columns, defaultFilters);
        this.closeDialog();
    }

    render() {
        const { columns } = this.props;
        return (
            <React.Fragment>
                <Tooltip
                    openDelay={500}
                    content={i18n.t('Select columns')}
                    dataTest="select-columns"
                >
                    <IconButton
                        onClick={this.openDialog}
                    >
                        <IconSettings24 />
                    </IconButton>
                </Tooltip>
                <ColumnSelectorDialog
                    open={this.state.dialogOpen}
                    onClose={this.closeDialog}
                    onSave={this.handleSave}
                    columns={columns}
                    defaultFilters={this.props.defaultFilters}
                />
            </React.Fragment>
        );
    }
}
