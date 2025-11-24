import { isProgramAccessible } from 'capture-core/extended/ouMode';
import type { Program, Icon } from '../../../../metaData';

const getOptionsFromPrograms = (
    programs: Array<Program>,
): Array<{
    value: string;
    label: string;
    icon?: Icon;
}> =>
    programs.map(program => ({
        label: program.name,
        value: program.id,
        icon: program.icon,
    }));

export const getOptions = (programsArray: Array<Program>, ouMode: string, selectedOrgUnitId?: string) => getOptionsFromPrograms(
    programsArray.filter(program => isProgramAccessible(program, ouMode, selectedOrgUnitId)),
);
