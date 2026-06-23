import { getDuplicateCheckConfig } from '../getDuplicateCheckConfig';

const NAMESPACE = 'capture-extended';
const KEY = 'duplicateCheckConfig';
const CONFIG = { U6z7eJniNfL: { orgUnitMode: 'SELECTED' } };

// Reason: mirrors the list-namespaces → list-keys → fetch flow that avoids 404s on fresh instances.
const makeQuery = ({ namespaces = [NAMESPACE], keys = [KEY], config = CONFIG } = {}) =>
    jest.fn(({ resource }) => {
        if (resource === 'dataStore') return Promise.resolve(namespaces);
        if (resource === `dataStore/${NAMESPACE}`) return Promise.resolve(keys);
        if (resource === `dataStore/${NAMESPACE}/${KEY}`) return Promise.resolve(config);
        return Promise.reject(new Error(`unexpected resource ${resource}`));
    });

describe('getDuplicateCheckConfig', () => {
    it('returns the config object when namespace and key both exist', async () => {
        await expect(getDuplicateCheckConfig(makeQuery())).resolves.toEqual(CONFIG);
    });

    it('returns {} without fetching the key when the namespace is absent', async () => {
        const query = makeQuery({ namespaces: ['other-namespace'] });

        await expect(getDuplicateCheckConfig(query)).resolves.toEqual({});
        expect(query).toHaveBeenCalledTimes(1);
        expect(query).toHaveBeenCalledWith({ resource: 'dataStore' });
    });

    it('returns {} without fetching the value when the key is absent', async () => {
        const query = makeQuery({ keys: ['someOtherKey'] });

        await expect(getDuplicateCheckConfig(query)).resolves.toEqual({});
        expect(query).toHaveBeenCalledTimes(2);
    });

    it('returns {} when a datastore read rejects', async () => {
        const query = jest.fn().mockRejectedValue(new Error('network'));

        await expect(getDuplicateCheckConfig(query)).resolves.toEqual({});
    });

    it('returns {} when the value is not a plain object', async () => {
        await expect(getDuplicateCheckConfig(makeQuery({ config: ['unexpected'] }))).resolves.toEqual({});
    });
});
