import { isNumber, isString } from "./primitives";
import { isArray } from "./structural";

export const isObjectOrNull = <T extends object, U>(term: T | U): term is T =>
  typeof term === "object";

export const isNonEmptyArray = <T, U>(term: Array<T> | U): term is Array<T> =>
  isArray(term) && term.length > 0;

export const isNonEmptyString = <U>(term: string | U): term is string =>
  isString(term) && term.length > 0;

export const isNumberOrNaN = <U>(term: number | U): term is number =>
  typeof term === "number";

export const isInteger = <U>(term: number | U): term is number =>
  isNumber(term) && Number.isInteger(term);

export const isPositiveInteger = <U>(term: number | U): term is number =>
  isInteger(term) && term > 0;

export const isNonNegativeInteger = <U>(term: number | U): term is number =>
  isInteger(term) && term >= 0;

export const isNegativeInteger = <U>(term: number | U): term is number =>
  isInteger(term) && term < 0;
