import { Draft, PayloadAction } from "@reduxjs/toolkit";

export interface INormalizeData<T, K extends keyof T> {
  values: { [key in number]?: T };
  keys: T[K][];
}

export const createNormalize = <T, S>() => {
  const fromResponse = <K extends keyof T = keyof T>(
    array?: T[],
    key?: K,
  ): INormalizeData<T, K> => {
    const keys: T[K][] = [];
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

  const reducers = <P>(key: keyof Draft<S>) => ({
    remove: (state: Draft<S>, { payload }: PayloadAction<P>) => {
      (state[key] as any).data.keys = (state[key] as any).data.keys.filter(
        (item: any) => item !== payload,
      );
    },
  });

  return {
    fromResponse,
    reducers,
  };
};
