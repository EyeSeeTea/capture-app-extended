import { getLocationQuery } from 'capture-core/utils/routing';

export function persistOuModeQueryParam(path: string) {
    const { ouMode } = getLocationQuery();
    if (!ouMode) return path;

    const [pathname, queryString] = path.split('?');
    const params = new URLSearchParams(queryString);

    if (!params.has('ouMode')) {
        params.set('ouMode', ouMode);
        return `${pathname}?${params.toString()}`;
    }
    return path;
}
