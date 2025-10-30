import type { QuerySingleResource } from 'capture-core/utils/api';
import { ExtendedTemplates } from 'capture-core/extended/filtersConfig.types';
import { Mutate } from 'capture-core/utils/api/api.types';

type SaveTemplateExtendedProps = {
  mutate: Mutate;
  querySingleResource: QuerySingleResource;
  type: TemplateExtendedPropType;
  config: ExtendedTemplates;
}

type DeleteTemplateExtendedProps = {
  mutate: Mutate;
  querySingleResource: QuerySingleResource;
  type: TemplateExtendedPropType;
  id: string;
}

export const templateExtendedPropType = {
    event: 'extended_eventFilter',
    tracker: 'extended_trackerFilter',
} as const;
type TemplateExtendedPropType = typeof templateExtendedPropType[keyof typeof templateExtendedPropType];

export const getTemplateExtendedProps = async (querySingleResource: QuerySingleResource, type: TemplateExtendedPropType) => getFiltersConfig(querySingleResource, type);

export const saveTemplateExtendedProps = async (props: SaveTemplateExtendedProps) => saveFiltersConfig(props);

export const deleteTemplateExtendedProps = async (props: DeleteTemplateExtendedProps) => deleteFiltersConfig(props);

async function getFiltersConfig(querySingleResource: QuerySingleResource, type: TemplateExtendedPropType) {
    try {
        const apiRes = await querySingleResource({
            resource: `dataStore/capture/${type}`,
        });
        return apiRes;
    } catch (e) {
        console.error(`getFiltersConfig - No existing config for ${type}, returning empty object:`, e);
        return {};
    }
}

async function saveFiltersConfig({
    mutate,
    querySingleResource,
    type,
    config,
}: SaveTemplateExtendedProps) {
    let storedValue;

    try {
        storedValue = await getFiltersConfig(querySingleResource, type);
    } catch (e) {
        console.error('saveFiltersConfig - Error getting existing config, using empty object:', e);
    }

    const payload = {
        ...(storedValue || {}),
        ...config,
    };

    try {
        const apiRes = await mutate({
            resource: `dataStore/capture/${type}`,
            data: payload,
            type: storedValue ? 'update' : 'create',
        });
        return apiRes;
    } catch (e) {
        console.error(`saveFiltersConfig - Error saving ${type}:`, e);
        return undefined;
    }
}

async function deleteFiltersConfig({
    mutate,
    querySingleResource,
    type,
    id,
}: DeleteTemplateExtendedProps) {
    let storedValue = {};

    try {
        storedValue = await getFiltersConfig(querySingleResource, type);
    } catch (e) {
        console.error('deleteFiltersConfig - Error getting existing config, using empty object:', e);
        storedValue = {};
    }

    const payload = Object.fromEntries(
        Object.entries(storedValue).filter(([key]) => key !== id),
    );


    try {
        const apiRes = await mutate({
            resource: `dataStore/capture/${type}`,
            data: payload,
            type: Object.keys(storedValue).length > 0 ? 'update' : 'create',
        });
        return apiRes;
    } catch (e) {
        console.error(`deleteFiltersConfig - Error saving ${type}:`, e);
        return undefined;
    }
}
