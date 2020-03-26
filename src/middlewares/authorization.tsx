import { checkAuthorization } from "Common/checkAuthorization";
import React, { FC } from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";

export const AuthorizationMiddleware = (Component: any) => {
  const AuthMiddleware: FC<RouteComponentProps> = props => {
    const token = "";
    const hasAuthenticationToken = () => checkAuthorization(token);

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
