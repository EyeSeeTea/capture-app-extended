import type { DefaultView, DefaultViewsConfig } from './defaultView.types';

export const resolveDefaultView = (
    userGroupIds: ReadonlyArray<string>,
    config: DefaultViewsConfig,
): DefaultView | undefined => {
    const matchedId = userGroupIds.find(id => Object.hasOwn(config, id));
    return matchedId !== undefined ? config[matchedId] : undefined;
};
