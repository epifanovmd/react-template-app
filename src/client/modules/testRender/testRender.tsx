import React, {FC, useState} from "react";
import {RenderComponent} from "../../components/renderComponent/renderComponent";
import Helmet from "react-helmet";

export const TestRender: FC = () => {

  const [logText, setLogText] = useState("Рендер 1");
  const setText = () => {
    console.log("Set");
    setLogText("Рендер 4");
  };

  return (
    <>
      <Helmet>
        <title>Test Render Page</title>
      </Helmet>
      <div onClick={setText}>Change</div>
      <RenderComponent text={logText} />
      <RenderComponent text={"Рендер 2"} />
      <RenderComponent text={"Рендер 3"} />
    </>
  );
};
