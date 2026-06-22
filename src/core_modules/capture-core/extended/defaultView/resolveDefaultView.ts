import type { DefaultView, DefaultViewsConfig } from './defaultView.types';

const hasOwn = (config: DefaultViewsConfig, id: string): boolean =>
    Object.prototype.hasOwnProperty.call(config, id);

const isComplete = (entry: DefaultView | undefined): entry is DefaultView =>
    !!entry && !!entry.programId && !!entry.templateId;

export const resolveDefaultView = (
    userGroupIds: ReadonlyArray<string>,
    config: DefaultViewsConfig,
): DefaultView | undefined => {
    const matchedId = userGroupIds.find(id => hasOwn(config, id) && isComplete(config[id]));
    return matchedId !== undefined ? config[matchedId] : undefined;
};
