import { isOrgUnitMode, type DuplicateCheckConfig } from './duplicateCheckConfig.types';

const readOrgUnitMode = (entry: unknown): unknown =>
    // Reason: cast is safe — we verified entry is a non-null object before reading the property.
    (entry && typeof entry === 'object' ? (entry as { orgUnitMode?: unknown }).orgUnitMode : undefined);

export const parseDuplicateCheckConfig = (raw: unknown): DuplicateCheckConfig => {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
        return {};
    }
    const validEntries = Object.entries(raw).flatMap(([scopeId, entry]) => {
        const mode = readOrgUnitMode(entry);
        return isOrgUnitMode(mode) ? [[scopeId, { orgUnitMode: mode }] as const] : [];
    });
    return Object.fromEntries(validEntries);
};
