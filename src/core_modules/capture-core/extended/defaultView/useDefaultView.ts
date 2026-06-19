import { useEffect } from 'react';
import { useApiMetadataQuery } from 'capture-core/utils/reactQueryHelpers';
import { buildUrlQueryString, useLocationQuery, useNavigate } from 'capture-core/utils/routing';
import { resolveDefaultView } from './resolveDefaultView';
import type { DefaultViewsConfig } from './defaultView.types';

type Me = { userGroups?: ReadonlyArray<{ id: string }> };

export const useDefaultView = (): void => {
    const { navigate } = useNavigate();
    const { programId, selectedTemplateId } = useLocationQuery();
    const isColdLoad = !programId && selectedTemplateId === undefined;

    const { data: hasConfig } = useApiMetadataQuery<Array<string>, boolean>(
        ['defaultView', 'namespace'],
        { resource: 'dataStore/capture-extended' },
        { enabled: isColdLoad, select: keys => !!keys?.includes('defaultViews') },
    );

    const { data: config } = useApiMetadataQuery<DefaultViewsConfig>(
        ['defaultView', 'config'],
        { resource: 'dataStore/capture-extended/defaultViews' },
        { enabled: isColdLoad && !!hasConfig },
    );

    const { data: userGroupIds } = useApiMetadataQuery<Me, Array<string>>(
        ['defaultView', 'me'],
        { resource: 'me', params: { fields: 'userGroups[id]' } },
        {
            enabled: isColdLoad && !!config,
            select: me => (me?.userGroups ?? []).map(group => group.id),
        },
    );

    const defaultView = resolveDefaultView(userGroupIds ?? [], config ?? {});

    useEffect(() => {
        if (!isColdLoad || !defaultView) return;
        const query = buildUrlQueryString({
            programId: defaultView.programId,
            selectedTemplateId: defaultView.templateId,
        });
        navigate(`/?${query}`);
    }, [isColdLoad, defaultView, navigate]);
};
