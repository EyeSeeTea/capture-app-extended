import { parseDefaultViewsConfig } from '../parseDefaultViewsConfig';

const validView = { programId: 'prog1', templateId: 'tmpl1' };

describe('parseDefaultViewsConfig', () => {
    it('keeps entries with non-empty string programId and templateId', () => {
        const config = { g1: validView };

        expect(parseDefaultViewsConfig(config)).toEqual(config);
    });

    describe('drops invalid entries (untrusted datastore JSON)', () => {
        it('removes an entry missing programId', () => {
            expect(parseDefaultViewsConfig({ g1: { templateId: 'tmpl1' } })).toEqual({});
        });

        it('removes an entry missing templateId', () => {
            expect(parseDefaultViewsConfig({ g1: { programId: 'prog1' } })).toEqual({});
        });

        it('removes non-string ids (e.g. 1 / true)', () => {
            expect(parseDefaultViewsConfig({ g1: { programId: 1, templateId: true } })).toEqual({});
        });

        it('removes empty-string ids', () => {
            expect(parseDefaultViewsConfig({ g1: { programId: 'prog1', templateId: '' } })).toEqual({});
        });

        it('keeps only the valid entries in a mixed config', () => {
            const raw = {
                g1: { templateId: 'tmpl1' },
                g2: validView,
            };

            expect(parseDefaultViewsConfig(raw)).toEqual({ g2: validView });
        });
    });

    describe('returns {} for non-object input', () => {
        it.each([
            ['undefined', undefined],
            ['null', null],
            ['an array', [validView]],
            ['a string', 'nope'],
        ])('%s', (_label, input) => {
            expect(parseDefaultViewsConfig(input)).toEqual({});
        });
    });
});
