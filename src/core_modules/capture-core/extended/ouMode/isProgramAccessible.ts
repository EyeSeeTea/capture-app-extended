import type { Program } from 'capture-core/metaData';
import { objectSome } from 'capture-core/extended/util';

export function isProgramAccessible(
    program: Program,
    ouMode: string,
    selectedOrgUnitId?: string,
): boolean {
    if (!program.access.data.read) return false;
    if (!selectedOrgUnitId) return true;

    const orgUnits: Record<string, string> = program.organisationUnits || {};
    const isSelectedOrgUnitInProgram = Boolean(orgUnits[selectedOrgUnitId]);

    switch (ouMode) {
    case 'DESCENDANTS':
        if (isSelectedOrgUnitInProgram) return true;

        return objectSome(orgUnits, path =>
            path.includes(`/${selectedOrgUnitId}/`) ||
            path.endsWith(`/${selectedOrgUnitId}`),
        );

    case 'CHILDREN':
        if (isSelectedOrgUnitInProgram) return true;

        return objectSome(orgUnits, (path) => {
            const parts = path.split('/').filter(Boolean);
            return parts[parts.length - 2] === selectedOrgUnitId;
        });
    case 'SELECTED':
    default:
        return isSelectedOrgUnitInProgram;
    }
}
