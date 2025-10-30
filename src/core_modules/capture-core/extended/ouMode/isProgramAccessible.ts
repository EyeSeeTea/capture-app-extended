import type { Program } from 'capture-core/metaData';

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

        // Iterate directly over the object without creating an intermediate array
        for (const path of Object.values(orgUnits)) {
            if (path.includes(`/${selectedOrgUnitId}/`) || path.endsWith(`/${selectedOrgUnitId}`)) {
                return true;
            }
        }
        return false;

    case 'CHILDREN':
        if (isSelectedOrgUnitInProgram) return true;

        // Iterate directly over the object without creating an intermediate array
        for (const path of Object.values(orgUnits)) {
            const parts = path.split('/').filter(Boolean);
            if (parts[parts.length - 2] === selectedOrgUnitId) {
                return true;
            }
        }
        return false;

    case 'SELECTED':
    default:
        return isSelectedOrgUnitInProgram;
    }
}
