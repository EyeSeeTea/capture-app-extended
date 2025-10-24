import type { Program } from 'capture-core/metaData';

export function isProgramAccessible(
    program: Program,
    ouMode: string,
    selectedOrgUnitId?: string,
): boolean {
    if (!program.access.data.read) return false;
    if (!selectedOrgUnitId) return true;

    const orgUnits = program.organisationUnits || {};

    switch (ouMode) {
    case 'DESCENDANTS':
        return Object.keys(orgUnits).includes(selectedOrgUnitId) ||
        Object.values(orgUnits).some(path =>
            String(path).includes(`/${selectedOrgUnitId}/`),
        );

    case 'CHILDREN':
        return Object.keys(orgUnits).includes(selectedOrgUnitId) ||
        Object.values(orgUnits).some((path) => {
            const parts = String(path).split('/');
            const index = parts.indexOf(selectedOrgUnitId);
            return index !== -1 && parts.length === index + 2;
        });

    case 'SELECTED':
    default:
        // Only the selected org unit
        return Object.keys(orgUnits).includes(selectedOrgUnitId);
    }
}
