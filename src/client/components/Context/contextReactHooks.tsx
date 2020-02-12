import React, { FC, memo, useCallback, useContext } from "react";
import styles from "./styles.module.scss";
import { Store } from "../../reactHooksStore/store";
import {
  TestRenderMemoComponent,
  TestRenderComponentNotMemo,
} from "./contextMobx";

export const ContextReactHooks: FC = () => {
  const { state, dispatch } = useContext(Store);

  const onChangeName = useCallback(() => {
    dispatch({ type: "CHANGE_NAME", payload: "Vasya" });
  }, [dispatch]);

  return (
    <>
      <div>
        {state.name}
        <br />
        <button onClick={onChangeName}>ChangeName</button>
        <TestRenderMemoComponent />
        <TestRenderComponentNotMemo />
      </div>
    </>
  );
};
