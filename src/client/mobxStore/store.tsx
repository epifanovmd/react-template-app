import { createContext } from "react";
import { action, decorate, observable } from "mobx";

class Store {
  name: string = "Andrei";
  changeName = (name: string) => {
    this.name = name;
  };
}

decorate(Store, {
  name: observable,
  changeName: action,
});

const store = new Store();

export const StoreContext = createContext(store);
