import { Draft, PayloadAction } from "@reduxjs/toolkit";

export interface INormalizeData<T, K extends keyof T> {
  values: { [key in number]?: T };
  keys: T[K][];
}

export const createNormalize = <T extends { id: any }, S>() => {
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

  const reducers = <K extends keyof Draft<S>>(key: K) => ({
    remove: (state: Draft<S>, { payload }: PayloadAction<T["id"]>) => {
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
