import { Draft, PayloadAction } from "@reduxjs/toolkit";

export interface INormalizeData<T, K extends keyof T> {
  values: { [key in number]?: T };
  keys: T[K][];
}

export const createNormalize = <T extends object, S, KK extends keyof T>(
  inputKey: KK,
) => {
  const fromResponse = (array?: T[]): INormalizeData<T, KK> => {
    const keys: T[KK][] = [];
    const values: { [key in string | number]?: T } = {};

    array &&
      array.forEach(item => {
        keys.push(item[inputKey]);
        values[item[inputKey] as any] = item;
      });

    return {
      values,
      keys,
    };
  };

  const reducers = <K extends keyof Draft<S>>(key: K) => ({
    remove: (state: Draft<S>, { payload }: PayloadAction<T[KK]>) => {
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
