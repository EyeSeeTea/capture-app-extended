import { resolveDefaultView } from '../resolveDefaultView';

const config = {
    g1: { programId: 'prog1', templateId: 'tmpl1' },
    g2: { programId: 'prog2', templateId: 'tmpl2' },
};

describe('resolveDefaultView', () => {
    it('returns entry of the first matching group in userGroupIds order', () => {
        expect(resolveDefaultView(['g2', 'g1'], config)).toEqual({ programId: 'prog2', templateId: 'tmpl2' });
    });

    it('returns first group entry when multiple groups match', () => {
        expect(resolveDefaultView(['g1', 'g2'], config)).toEqual({ programId: 'prog1', templateId: 'tmpl1' });
    });

    it('returns undefined when no group matches', () => {
        expect(resolveDefaultView(['g3', 'g4'], config)).toBeUndefined();
    });

    it('returns undefined for empty config', () => {
        expect(resolveDefaultView(['g1'], {})).toBeUndefined();
    });

    it('returns undefined for empty userGroupIds', () => {
        expect(resolveDefaultView([], config)).toBeUndefined();
    });

    it('ignores prototype-chain keys like toString/__proto__', () => {
        expect(resolveDefaultView(['toString', '__proto__'], {})).toBeUndefined();
    });

    it('skips incomplete entries and matches the next complete group', () => {
        const partialConfig = {
            g1: { templateId: 'tmpl1' },
            g2: { programId: 'prog2', templateId: 'tmpl2' },
        };
        expect(resolveDefaultView(['g1', 'g2'], partialConfig)).toEqual({ programId: 'prog2', templateId: 'tmpl2' });
    });

    it('returns undefined when the only matching entry is missing programId or templateId', () => {
        expect(resolveDefaultView(['g1'], { g1: { programId: 'prog1' } })).toBeUndefined();
    });
});
