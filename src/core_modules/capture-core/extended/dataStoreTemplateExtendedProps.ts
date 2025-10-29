import type { QuerySingleResource } from 'capture-core/utils/api';
import { ExtendedTemplates } from 'capture-core/extended/filtersConfig.types';
import { Mutate } from 'capture-core/utils/api/api.types';

type SaveTemplateExtendedProps = {
  mutate: Mutate;
  querySingleResource: QuerySingleResource;
  type: TemplateExtendedPropType;
  config: ExtendedTemplates;
}

export const templateExtendedPropType = {
    event: 'extended_eventFilter',
    tei: 'extended_trackedEntityFilter',
    programStage: 'extended_programStageWorkingList',
} as const;
type TemplateExtendedPropType = typeof templateExtendedPropType[keyof typeof templateExtendedPropType];

async function getFiltersConfig(querySingleResource: QuerySingleResource, type: TemplateExtendedPropType) {
    try {
        const apiRes = await querySingleResource({
            resource: `dataStore/capture/${type}`,
        });
        return apiRes;
    } catch (e) {
        console.log(`getFiltersConfig - No existing config for ${type}, returning empty object:`, e);
        return {};
    }
}

export const getTemplateExtendedProps = async (querySingleResource: QuerySingleResource, type: TemplateExtendedPropType) => await getFiltersConfig(querySingleResource, type);

async function saveFiltersConfig({
    mutate,
    querySingleResource,
    type,
    config,
}: SaveTemplateExtendedProps) {
    let storedValue = {};

    try {
        storedValue = await getFiltersConfig(querySingleResource, type);
    } catch (e) {
        console.log('saveFiltersConfig - Error getting existing config, using empty object:', e);
        storedValue = {};
    }

    const payload = {
        ...storedValue,
        ...config,
    };

    try {
        const apiRes = await mutate({
            resource: `dataStore/capture/${type}`,
            data: payload,
            type: Object.keys(storedValue).length > 0 ? 'update' : 'create',
        });
        return apiRes;
    } catch (e) {
        console.error(`saveFiltersConfig - Error saving ${type}:`, e);
        throw e; // Re-throw the error so caller knows it failed
    }
}


export const saveTemplateExtendedProps = async (props: SaveTemplateExtendedProps) => saveFiltersConfig(props);
