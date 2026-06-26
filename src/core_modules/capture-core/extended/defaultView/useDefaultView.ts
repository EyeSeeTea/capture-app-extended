import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useApiMetadataQuery } from 'capture-core/utils/reactQueryHelpers';
import { buildUrlQueryString, useLocationQuery } from 'capture-core/utils/routing';
import { persistOuModeQueryParam } from 'capture-core/extended/ouMode';
import { resolveDefaultView } from './resolveDefaultView';
import { parseDefaultViewsConfig } from './parseDefaultViewsConfig';
import type { DefaultViewsConfig } from './defaultView.types';

type Me = { userGroups?: ReadonlyArray<{ id: string }> };

export const useDefaultView = (): void => {
    const history = useHistory();
    const { programId, selectedTemplateId, orgUnitId, all } = useLocationQuery();
    const isColdLoad = !programId && selectedTemplateId === undefined;

    // Reason: list namespaces first so a fresh instance (no capture-extended) never 404s.
    const { data: hasNamespace } = useApiMetadataQuery<Array<string>, boolean>(
        ['defaultView', 'namespaces'],
        { resource: 'dataStore' },
        { enabled: isColdLoad, select: namespaces => !!namespaces?.includes('capture-extended') },
    );

    const { data: hasConfig } = useApiMetadataQuery<Array<string>, boolean>(
        ['defaultView', 'keys'],
        { resource: 'dataStore/capture-extended' },
        { enabled: isColdLoad && !!hasNamespace, select: keys => !!keys?.includes('defaultViews') },
    );

    const { data: config } = useApiMetadataQuery<unknown, DefaultViewsConfig>(
        ['defaultView', 'config'],
        { resource: 'dataStore/capture-extended/defaultViews' },
        { enabled: isColdLoad && !!hasConfig, select: parseDefaultViewsConfig },
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
        // Reason: stay consistent with handleChangeTemplateUrl, which preserves orgUnitId/all rather than dropping them.
        const query = buildUrlQueryString({
            ...(orgUnitId ? { orgUnitId } : {}),
            programId: defaultView.programId,
            selectedTemplateId: defaultView.templateId,
        });
        const url = `/?${query}${all !== undefined ? '&all' : ''}`;
        // Reason: replace (not push) so the transient cold URL stays out of history and Back can't re-trigger the redirect.
        history.replace(persistOuModeQueryParam(url));
    }, [isColdLoad, defaultView, orgUnitId, all, history]);
};
