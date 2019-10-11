import React, {FC, useState} from "react";
import {RenderComponentFC} from "../../components/renderComponent/renderComponent";

export const TestRender: FC = (): JSX.Element => {

  const [logText, setLogText] = useState("Рендер 1");
  const setText = () => {
    console.log("Set");
    setLogText("Рендер 4");
  };

  return (
    <>
      <div onClick={setText}>Change</div>
      <RenderComponentFC text={logText}/>
      <RenderComponentFC text={"Рендер 2"}/>
      <RenderComponentFC text={"Рендер 3"}/>
    </>
  );
};
