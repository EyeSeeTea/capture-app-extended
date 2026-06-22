import type { DefaultView, DefaultViewsConfig } from './defaultView.types';

const hasOwn = (config: DefaultViewsConfig, id: string): boolean =>
    Object.prototype.hasOwnProperty.call(config, id);

// Reason: config is admin-authored datastore JSON, so reject non-string IDs (e.g. 1/true) before redirecting.
const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.length > 0;

const isComplete = (entry: DefaultView | undefined): entry is DefaultView =>
    !!entry && isNonEmptyString(entry.programId) && isNonEmptyString(entry.templateId);

export const resolveDefaultView = (
    userGroupIds: ReadonlyArray<string>,
    config: DefaultViewsConfig,
): DefaultView | undefined => {
    const matchedId = userGroupIds.find(id => hasOwn(config, id) && isComplete(config[id]));
    return matchedId !== undefined ? config[matchedId] : undefined;
};
