import log from 'loglevel';
import type { QuerySingleResource } from 'capture-core/utils/api';
import { parseDuplicateCheckConfig } from './parseDuplicateCheckConfig';
import type { DuplicateCheckConfig } from './duplicateCheckConfig.types';

const DATASTORE_RESOURCE = 'dataStore/capture-extended/duplicateCheckConfig';

export async function getDuplicateCheckConfig(querySingleResource: QuerySingleResource): Promise<DuplicateCheckConfig> {
    try {
        const raw = await querySingleResource({ resource: DATASTORE_RESOURCE });
        return parseDuplicateCheckConfig(raw);
    } catch (error) {
        // Reason: a 404 is the expected "key not configured" case; only surface genuine read failures.
        const httpStatusCode = (error as { httpStatusCode?: number })?.httpStatusCode;
        if (httpStatusCode !== 404) {
            log.error('getDuplicateCheckConfig: failed to read config, defaulting to ACCESSIBLE scope', error);
        }
        return {};
    }
}
