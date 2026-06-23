import { resolveDuplicateCheckOrgUnitParams } from '../resolveDuplicateCheckOrgUnitParams';

const SCOPE = 'U6z7eJniNfL';
const ORG_UNIT = 'Ou1Albania00';

const newParams = { orgUnitModeQueryParam: 'orgUnitMode', orgUnitQueryParam: 'orgUnits' };

const resolve = (config, orgUnitId = ORG_UNIT, names = newParams) =>
    resolveDuplicateCheckOrgUnitParams({
        config,
        scopeId: SCOPE,
        orgUnitId,
        ...names,
    });

describe('resolveDuplicateCheckOrgUnitParams', () => {
    describe('configured org-unit-relative modes', () => {
        it('SELECTED with an org unit emits the mode and the org-unit param', () => {
            expect(resolve({ [SCOPE]: { orgUnitMode: 'SELECTED' } }))
                .toEqual({ orgUnitMode: 'SELECTED', orgUnits: ORG_UNIT });
        });

        it('SELECTED without an org unit falls back to ACCESSIBLE', () => {
            expect(resolve({ [SCOPE]: { orgUnitMode: 'SELECTED' } }, null))
                .toEqual({ orgUnitMode: 'ACCESSIBLE' });
        });
    });

    describe('configured user-scoped modes', () => {
        it('CAPTURE emits the mode with no org-unit param', () => {
            expect(resolve({ [SCOPE]: { orgUnitMode: 'CAPTURE' } }))
                .toEqual({ orgUnitMode: 'CAPTURE' });
        });
    });

    describe('fallback to ACCESSIBLE', () => {
        it('absent scope entry', () => {
            expect(resolve({ OtherScope: { orgUnitMode: 'SELECTED' } }))
                .toEqual({ orgUnitMode: 'ACCESSIBLE' });
        });

        it('empty config', () => {
            expect(resolve({})).toEqual({ orgUnitMode: 'ACCESSIBLE' });
        });

        it('invalid mode string', () => {
            expect(resolve({ [SCOPE]: { orgUnitMode: 'WRONG' } }))
                .toEqual({ orgUnitMode: 'ACCESSIBLE' });
        });

        it('non-string mode value', () => {
            expect(resolve({ [SCOPE]: { orgUnitMode: 42 } }))
                .toEqual({ orgUnitMode: 'ACCESSIBLE' });
        });
    });

    describe('legacy query-param names (DHIS2 < 41)', () => {
        const legacy = { orgUnitModeQueryParam: 'ouMode', orgUnitQueryParam: 'orgUnit' };

        it('honours the passed-in param names', () => {
            expect(resolve({ [SCOPE]: { orgUnitMode: 'SELECTED' } }, ORG_UNIT, legacy))
                .toEqual({ ouMode: 'SELECTED', orgUnit: ORG_UNIT });
        });
    });
});
