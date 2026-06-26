import log from 'loglevel';
import { getDuplicateCheckConfig } from '../getDuplicateCheckConfig';

const RESOURCE = 'dataStore/capture-extended/duplicateCheckConfig';
const SCOPE = 'U6z7eJniNfL';

describe('getDuplicateCheckConfig', () => {
    let logErrorSpy;

    beforeEach(() => {
        logErrorSpy = jest.spyOn(log, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        logErrorSpy.mockRestore();
    });

    it('reads the datastore key and returns the parsed config', async () => {
        const config = { [SCOPE]: { orgUnitMode: 'SELECTED' } };
        const querySingleResource = jest.fn().mockResolvedValue(config);

        await expect(getDuplicateCheckConfig(querySingleResource)).resolves.toEqual(config);
        expect(querySingleResource).toHaveBeenCalledWith({ resource: RESOURCE });
    });

    it('falls back to {} silently when the key is absent (404)', async () => {
        const querySingleResource = jest.fn().mockRejectedValue({ httpStatusCode: 404 });

        await expect(getDuplicateCheckConfig(querySingleResource)).resolves.toEqual({});
        expect(logErrorSpy).not.toHaveBeenCalled();
    });

    it('falls back to {} and logs on a non-404 error', async () => {
        const querySingleResource = jest.fn().mockRejectedValue({ httpStatusCode: 500 });

        await expect(getDuplicateCheckConfig(querySingleResource)).resolves.toEqual({});
        expect(logErrorSpy).toHaveBeenCalledTimes(1);
    });
});
