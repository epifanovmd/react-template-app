export interface INormalizeData<T> {
  values: { [key in string | number]?: T };
  keys: T[keyof T][];
}
export const createNormalize = <T>(
  array?: T[],
  key?: keyof T,
): INormalizeData<T> => {
  const keys: T[keyof T][] = [];
  const values: { [key in string | number]?: T } = {};

  key &&
    array &&
    array.forEach(item => {
      keys.push(item[key]);
      values[item[key] as any] = item;
    });

  return {
    values,
    keys,
  };
};
