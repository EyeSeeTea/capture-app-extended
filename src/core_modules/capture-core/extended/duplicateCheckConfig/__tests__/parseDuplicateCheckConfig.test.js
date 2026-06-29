import { parseDuplicateCheckConfig } from '../parseDuplicateCheckConfig';

const SCOPE = 'U6z7eJniNfL';

describe('parseDuplicateCheckConfig', () => {
    it('keeps entries with a valid orgUnitMode', () => {
        const config = { [SCOPE]: { orgUnitMode: 'SELECTED' } };

        expect(parseDuplicateCheckConfig(config)).toEqual(config);
    });

    describe('drops invalid entries (untrusted datastore JSON)', () => {
        it('removes an unknown mode string', () => {
            expect(parseDuplicateCheckConfig({ [SCOPE]: { orgUnitMode: 'WRONG' } })).toEqual({});
        });

        it('removes a non-string mode value', () => {
            expect(parseDuplicateCheckConfig({ [SCOPE]: { orgUnitMode: 42 } })).toEqual({});
        });

        it('removes an entry missing orgUnitMode', () => {
            expect(parseDuplicateCheckConfig({ [SCOPE]: {} })).toEqual({});
        });

        it('keeps only the valid entries in a mixed config', () => {
            const raw = {
                [SCOPE]: { orgUnitMode: 'CAPTURE' },
                bad1: { orgUnitMode: 'NOPE' },
                bad2: { orgUnitMode: true },
            };

            expect(parseDuplicateCheckConfig(raw)).toEqual({ [SCOPE]: { orgUnitMode: 'CAPTURE' } });
        });
    });

    describe('returns {} for non-object input', () => {
        it.each([
            ['undefined', undefined],
            ['null', null],
            ['an array', ['unexpected']],
            ['a string', 'nope'],
        ])('%s', (_label, input) => {
            expect(parseDuplicateCheckConfig(input)).toEqual({});
        });
    });
});
