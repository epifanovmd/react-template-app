import {PopupNotification} from "./components/popupNotification/popupNotification";
import {Route} from "react-router";
import React, {lazy, Suspense} from "react";
import {NavLink} from "react-router-dom";

import "./assets/clearfix.scss";

const Users = lazy(() => import("./modules/users/Users"));
const UseFormComponent = lazy(() => import("./modules/useForm/UseForm"));
const TestPage = lazy(() => import("./modules/testPage/TestPage"));
const TestRender = lazy(() => import("./modules/testRender/testRender"));

export const Routes = () => (
  <>
    <PopupNotification />
    <ul className={"container"}>
      <li>
        <NavLink to={"/"}>{"Users"}</NavLink>
      </li>
      <li>
        <NavLink to={"/test"}>{"Test Page"}</NavLink>
      </li>
      <li>
        <NavLink to={"/useform"}>{"UseForm"}</NavLink>
      </li>
      <li>
        <NavLink to={"/testRender"}>{"TestRender"}</NavLink>
      </li>
    </ul>
    <br />
    <Suspense fallback={<div>Загрузка...</div>}>
      <Route exact={true} path="/" component={Users} />
      <Route exact={true} path="/userlist/:id" component={Users} />
      <Route exact={true} path="/test" component={TestPage} />
      <Route exact={true} path="/useform" component={UseFormComponent} />
      <Route exact={true} path="/testRender" component={TestRender} />
    </Suspense>
  </>
);
