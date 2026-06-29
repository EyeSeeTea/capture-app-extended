import type { DefaultView, DefaultViewsConfig } from './defaultView.types';

const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.length > 0;

const toDefaultView = (entry: unknown): DefaultView | undefined => {
    // Reason: cast is safe — we verified entry is a non-null object before reading the properties.
    const view = entry && typeof entry === 'object' ? (entry as { programId?: unknown; templateId?: unknown }) : undefined;
    return view && isNonEmptyString(view.programId) && isNonEmptyString(view.templateId)
        ? { programId: view.programId, templateId: view.templateId }
        : undefined;
};

export const parseDefaultViewsConfig = (raw: unknown): DefaultViewsConfig => {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
        return {};
    }
    const validEntries = Object.entries(raw).flatMap(([groupId, entry]) => {
        const view = toDefaultView(entry);
        return view ? [[groupId, view] as const] : [];
    });
    return Object.fromEntries(validEntries);
};
