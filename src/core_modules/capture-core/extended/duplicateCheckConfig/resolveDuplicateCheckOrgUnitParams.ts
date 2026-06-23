import {
    validOrgUnitModes,
    orgUnitModesRequiringOrgUnit,
    defaultOrgUnitMode,
    type DuplicateCheckConfig,
    type OrgUnitMode,
} from './duplicateCheckConfig.types';

type Input = {
    config: DuplicateCheckConfig;
    scopeId: string;
    orgUnitId?: string | null;
    orgUnitModeQueryParam: string;
    orgUnitQueryParam: string;
};

const isValidMode = (value: unknown): value is OrgUnitMode =>
    typeof value === 'string' && (validOrgUnitModes as ReadonlyArray<string>).includes(value);

export function resolveDuplicateCheckOrgUnitParams({
    config,
    scopeId,
    orgUnitId,
    orgUnitModeQueryParam,
    orgUnitQueryParam,
}: Input): Record<string, string> {
    const configured = config?.[scopeId]?.orgUnitMode;
    const requestedMode = isValidMode(configured) ? configured : defaultOrgUnitMode;
    const needsOrgUnit = orgUnitModesRequiringOrgUnit.includes(requestedMode);

    return needsOrgUnit && orgUnitId
        ? { [orgUnitModeQueryParam]: requestedMode, [orgUnitQueryParam]: orgUnitId }
        : { [orgUnitModeQueryParam]: needsOrgUnit ? defaultOrgUnitMode : requestedMode };
}
