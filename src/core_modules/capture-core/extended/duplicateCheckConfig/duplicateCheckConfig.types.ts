export const validOrgUnitModes = [
    'SELECTED',
    'CHILDREN',
    'DESCENDANTS',
    'ACCESSIBLE',
    'CAPTURE',
    'ALL',
] as const;

export type OrgUnitMode = (typeof validOrgUnitModes)[number];

export const orgUnitModesRequiringOrgUnit: ReadonlyArray<OrgUnitMode> = [
    'SELECTED',
    'CHILDREN',
    'DESCENDANTS',
];

export const defaultOrgUnitMode: OrgUnitMode = 'ACCESSIBLE';

export const isOrgUnitMode = (value: unknown): value is OrgUnitMode =>
    typeof value === 'string' && (validOrgUnitModes as ReadonlyArray<string>).includes(value);

export type DuplicateCheckEntry = {
    orgUnitMode: OrgUnitMode;
};

export type DuplicateCheckConfig = Readonly<Record<string, DuplicateCheckEntry>>;
