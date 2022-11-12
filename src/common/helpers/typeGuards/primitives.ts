export const isUndefined = <T>(term: T | undefined): term is undefined =>
  typeof term === "undefined";

export const isBoolean = <U>(term: boolean | U): term is boolean =>
  typeof term === "boolean";

export const isNumber = <U>(term: number | U): term is number =>
  typeof term === "number" && !Number.isNaN(term);

export const isString = <U>(term: string | U): term is string =>
  typeof term === "string";

export const isBigInt = <U>(term: bigint | U): term is bigint =>
  typeof term === "bigint";

export const isSymbol = <U>(term: symbol | U): term is symbol =>
  typeof term === "symbol";
