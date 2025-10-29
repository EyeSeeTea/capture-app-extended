import type { QuerySingleResource } from 'capture-core/utils/api';

export const templateExtendedPropType = {
    event: 'extended_eventFilter',
    tei: 'extended_trackedEntityFilter',
    programStage: 'extended_programStageWorkingList',
} as const;
type TemplateExtendedPropType = typeof templateExtendedPropType[keyof typeof templateExtendedPropType];

const getFiltersExtendedProps = async (querySingleResource: QuerySingleResource, type: TemplateExtendedPropType) => {
    try {
        const apiRes = await querySingleResource({
            resource: `dataStore/capture/${type}`,
        });
        console.log('events', apiRes);
    } catch (e) {
        return {};
        console.error(`Error fetching ${type}`, e);
    }
};

export const getTemplateExtendedProps = async (querySingleResource: QuerySingleResource, type: TemplateExtendedPropType) => {
    await getFiltersExtendedProps(querySingleResource, type);
};
