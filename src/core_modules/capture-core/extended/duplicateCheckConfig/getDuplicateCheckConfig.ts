import type { QuerySingleResource } from 'capture-core/utils/api';
import type { DuplicateCheckConfig } from './duplicateCheckConfig.types';

const NAMESPACE = 'capture-extended';
const KEY = 'duplicateCheckConfig';

export async function getDuplicateCheckConfig(querySingleResource: QuerySingleResource): Promise<DuplicateCheckConfig> {
    try {
        // Reason: list namespaces/keys before fetching so a fresh instance (no key) never 404s.
        const namespaces = await querySingleResource({ resource: 'dataStore' });
        if (!Array.isArray(namespaces) || !namespaces.includes(NAMESPACE)) {
            return {};
        }
        const keys = await querySingleResource({ resource: `dataStore/${NAMESPACE}` });
        if (!Array.isArray(keys) || !keys.includes(KEY)) {
            return {};
        }
        const config = await querySingleResource({ resource: `dataStore/${NAMESPACE}/${KEY}` });
        return config && typeof config === 'object' && !Array.isArray(config) ? config : {};
    } catch (ignored) {
        // Reason: any datastore read failure ⇒ default (ACCESSIBLE) scope, identical to pre-feature behaviour.
        return {};
    }
}
