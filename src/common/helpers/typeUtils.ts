export type CheckArray<T> = T extends any[] ? T[number] : T;
export type PartialObject<T> = T extends object ? Partial<T> : T;

export type SubType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
  }[keyof Base]
>;
