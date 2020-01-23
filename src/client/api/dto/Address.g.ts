/*tslint:disable*/

import { Geo } from "./Geo.g";

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
