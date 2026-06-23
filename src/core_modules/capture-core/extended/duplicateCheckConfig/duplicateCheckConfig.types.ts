export const validOrgUnitModes = [
    'SELECTED',
    'CHILDREN',
    'DESCENDANTS',
    'ACCESSIBLE',
    'CAPTURE',
    'ALL',
] as const;

export type OrgUnitMode = (typeof validOrgUnitModes)[number];

// Reason: org-unit-relative modes need an explicit org unit; the rest are user-scoped.
export const orgUnitModesRequiringOrgUnit: ReadonlyArray<OrgUnitMode> = [
    'SELECTED',
    'CHILDREN',
    'DESCENDANTS',
];

export const defaultOrgUnitMode: OrgUnitMode = 'ACCESSIBLE';

export type DuplicateCheckEntry = {
    orgUnitMode: string;
};

export type DuplicateCheckConfig = Readonly<Record<string, DuplicateCheckEntry>>;
