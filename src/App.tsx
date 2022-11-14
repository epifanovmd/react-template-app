import "rc-tooltip/assets/bootstrap.css";

import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, Route, Routes } from "react-router-dom";

import { IRoute, routes } from "./routes";
import { Header } from "./components";
import { Container } from "./components/layouts/container";
import Helmet from "react-helmet";

const App = () => {
  const { i18n } = useTranslation();

  const renderRoutes = useCallback(
    (_routes: IRoute[]) =>
      _routes.map(route => {
        const Component = route.component;
        const Child = route.children?.[0].component;

        return (
          <Route
            path={route.path}
            key={route.path}
            element={
              <>
                <Component />
                <Outlet />
              </>
            }
          >
            {Child && <Route index={true} element={<Child />} />}
            {renderRoutes(route.children || [])}
          </Route>
        );
      }),
    [],
  );

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

      <Routes>{renderRoutes(routes)}</Routes>
    </Container>
  );
};

export default App;
