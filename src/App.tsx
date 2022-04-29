import "rc-tooltip/assets/bootstrap.css";

import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

import { routes } from "./routes";
import { Header } from "./components";
import { Container } from "./components/layouts/container";

const App = () => {
  const { i18n } = useTranslation();

  return (
    <Container key={i18n.language}>
      <Header />
      <br />
      <Routes>
        {routes.map(route => {
          const Component = route.component;

          return <Route {...route} key={route.path} element={<Component />} />;
        })}
      </Routes>
    </Container>
  );
};

export default App;
