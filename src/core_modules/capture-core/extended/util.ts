export function objectSome<T extends Record<string, unknown>>(
    obj: T,
    predicate: (value: T[keyof T], key: keyof T) => boolean,
): boolean {
    for (const key in obj) {
        if (Object.hasOwn(obj, key) && predicate(obj[key], key)) {
            return true;
        }
    }
    return false;
}
