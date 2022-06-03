import "rc-tooltip/assets/bootstrap.css";

import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

import { routes } from "./routes";
import { Header } from "./components";
import { Container } from "./components/layouts/container";
import Helmet from "react-helmet";

const App = () => {
  const { i18n } = useTranslation();

  return (
    <Container key={i18n.language}>
      <Helmet>
        <meta property="og:title" content="SPA SSR APP Example" />
        <meta
          property="og:description"
          content="React SPA Server Side Rendering application example"
        />
        <meta property="og:image" content="https://picsum.photos/200/300" />
      </Helmet>
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
