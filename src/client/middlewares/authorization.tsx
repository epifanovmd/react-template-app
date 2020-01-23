import React, { FC } from "react";
import { withRouter } from "react-router-dom";
import { checkAuthorization } from "../common/checkAuthorization";
import { useSelector } from "react-redux";
import { IAppState } from "../store/IAppState";
import { RouteComponentProps } from "react-router";

export const AuthorizationMiddleware = (Component: any) => {
  const AuthMiddleware: FC<RouteComponentProps> = (props) => {
    const token = useSelector((state: IAppState) => state.auth.token);
    const hasAuthenticationToken = () => {
      return checkAuthorization(token);
    };

    const checkAuthentication = () => {
      if (!hasAuthenticationToken()) {
        const { location, history } = props;
        const redirect = location.pathname + location.search;

        history.push(`${"authorization"}?redirect=${redirect}`);
      }
    };
    checkAuthentication();

    return <Component />;
  };

  return withRouter(AuthMiddleware);
};