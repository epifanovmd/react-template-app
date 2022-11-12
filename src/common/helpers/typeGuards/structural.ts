export const isNull = <T>(term: T | null): term is null => term === null;

export const isFunction = <T extends Function, U>(term: T | U): term is T =>
  typeof term === "function";

export const isObject = <T extends object, U>(
  term: T | U,
): term is NonNullable<T> => !isNull(term) && typeof term === "object";

export const isArray = <T, U>(term: Array<T> | U): term is Array<T> =>
  Array.isArray(term);

export const isMap = <K, V, U>(term: Map<K, V> | U): term is Map<K, V> =>
  term instanceof Map;

export const isSet = <T, U>(term: Set<T> | U): term is Set<T> =>
  term instanceof Set;

export const isWeakMap = <K extends object, V, U>(
  term: WeakMap<K, V> | U,
): term is WeakMap<K, V> => term instanceof WeakMap;

export const isWeakSet = <T extends object, U>(
  term: WeakSet<T> | U,
): term is WeakSet<T> => term instanceof WeakSet;

export const isDate = <U>(term: Date | U): term is Date => term instanceof Date;
