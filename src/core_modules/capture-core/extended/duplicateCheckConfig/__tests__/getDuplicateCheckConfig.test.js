import { getDuplicateCheckConfig } from '../getDuplicateCheckConfig';

const RESOURCE = 'dataStore/capture-extended/duplicateCheckConfig';
const SCOPE = 'U6z7eJniNfL';

describe('getDuplicateCheckConfig', () => {
    it('reads the datastore key and returns the parsed config', async () => {
        const config = { [SCOPE]: { orgUnitMode: 'SELECTED' } };
        const querySingleResource = jest.fn().mockResolvedValue(config);

        await expect(getDuplicateCheckConfig(querySingleResource)).resolves.toEqual(config);
        expect(querySingleResource).toHaveBeenCalledWith({ resource: RESOURCE });
    });

    it('falls back to {} when the key is absent (query rejects with 404)', async () => {
        const querySingleResource = jest.fn().mockRejectedValue(new Error('404'));

        await expect(getDuplicateCheckConfig(querySingleResource)).resolves.toEqual({});
    });
});
