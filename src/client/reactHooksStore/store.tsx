import React, { FC, useReducer, Dispatch } from "react";

interface IState {
  name: string;
}

const initialState: IState = {
  name: "Andrei",
};

export const Store = React.createContext<{
  state: IState;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => {},
});

const reducer = (_state: IState, action: any): IState => {
  switch (action.type) {
    case "CHANGE_NAME":
      if (_state.name === action.payload) {
        return _state;
      }

      return { ..._state, name: action.payload };
    default:
      return _state;
  }
};

export const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{children}</Store.Provider>;
};
