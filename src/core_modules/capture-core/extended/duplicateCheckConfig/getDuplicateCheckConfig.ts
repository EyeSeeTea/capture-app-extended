import type { QuerySingleResource } from 'capture-core/utils/api';
import { parseDuplicateCheckConfig } from './parseDuplicateCheckConfig';
import type { DuplicateCheckConfig } from './duplicateCheckConfig.types';

const DATASTORE_RESOURCE = 'dataStore/capture-extended/duplicateCheckConfig';

export async function getDuplicateCheckConfig(querySingleResource: QuerySingleResource): Promise<DuplicateCheckConfig> {
    try {
        const raw = await querySingleResource({ resource: DATASTORE_RESOURCE });
        return parseDuplicateCheckConfig(raw);
    } catch (ignored) {
        // Reason: key is absent (404) on unconfigured instances ⇒ default ACCESSIBLE scope. Read stays
        // uncached and direct so admin config edits apply on the next save without a page reload.
        return {};
    }
}
