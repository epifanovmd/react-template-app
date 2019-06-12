export interface ICallback<Tin, Tout> {
  (result: Tin): Tout;
}
