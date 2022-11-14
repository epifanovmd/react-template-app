import React, { useEffect } from "react";
import { INavigationService } from "./Navigation.service";
import { useLocation, useNavigate } from "react-router-dom";

export const NavigationProvider = () => {
  const { _init } = INavigationService.useInject();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    _init(navigate, location);
  }, [_init, navigate, location]);

  return null;
};
