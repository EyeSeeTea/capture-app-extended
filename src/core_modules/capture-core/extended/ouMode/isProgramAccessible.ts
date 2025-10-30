import type { Program } from 'capture-core/metaData';

export function isProgramAccessible(
    program: Program,
    ouMode: string,
    selectedOrgUnitId?: string,
): boolean {
    if (!program.access.data.read) return false;
    if (!selectedOrgUnitId) return true;

    const orgUnits = program.organisationUnits || {};
    const isSelectedOrgUnitInProgram = Boolean(orgUnits[selectedOrgUnitId]);

    switch (ouMode) {
    case 'DESCENDANTS':
        return isSelectedOrgUnitInProgram || Object.values(orgUnits).some(path =>
            String(path).includes(`/${selectedOrgUnitId}/`),
        );

    case 'CHILDREN':
        return isSelectedOrgUnitInProgram || Object.values(orgUnits).some((path) => {
            const parts = String(path).split('/');
            const index = parts.indexOf(selectedOrgUnitId);
            return index !== -1 && parts.length === index + 2;
        });

    case 'SELECTED':
    default:
        return isSelectedOrgUnitInProgram;
    }
}
