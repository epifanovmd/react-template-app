import React, { FC, memo, useCallback, useContext } from "react";
import styles from "./styles.module.scss";
import { StoreContext } from "../../mobxStore/store";
import { observer } from "mobx-react-lite";

export const TestRenderMemoComponent: FC = memo(() => {
  console.log("Memo component rendered");

  return <></>;
});

export const TestRenderComponentNotMemo: FC = () => {
  console.log("Component rendered");

  return <></>;
};

const ContextMobx1: FC = () => {
  const { name, changeName } = useContext(StoreContext);

  const onChangeName = useCallback(() => {
    changeName("Vasya");
  }, [changeName]);

  return (
    <div>
      {name}
      <br />
      <button onClick={onChangeName}>ChangeName</button>
      <TestRenderMemoComponent />
      <TestRenderComponentNotMemo />
    </div>
  );
};

export const ContextMobx = observer(ContextMobx1);
