import {
    orgUnitModesRequiringOrgUnit,
    defaultOrgUnitMode,
    type DuplicateCheckConfig,
} from './duplicateCheckConfig.types';

type Input = {
    config: DuplicateCheckConfig;
    scopeId: string;
    orgUnitId?: string | null;
    orgUnitModeQueryParam: string;
    orgUnitQueryParam: string;
};

export function resolveDuplicateCheckOrgUnitParams({
    config,
    scopeId,
    orgUnitId,
    orgUnitModeQueryParam,
    orgUnitQueryParam,
}: Input): Record<string, string> {
    const requestedMode = config[scopeId]?.orgUnitMode ?? defaultOrgUnitMode;
    const needsOrgUnit = orgUnitModesRequiringOrgUnit.includes(requestedMode);

    return {
        [orgUnitModeQueryParam]: needsOrgUnit && !orgUnitId ? defaultOrgUnitMode : requestedMode,
        ...(needsOrgUnit && orgUnitId ? { [orgUnitQueryParam]: orgUnitId } : {}),
    };
}
