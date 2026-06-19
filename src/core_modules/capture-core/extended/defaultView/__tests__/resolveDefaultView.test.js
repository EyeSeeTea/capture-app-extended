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
});
