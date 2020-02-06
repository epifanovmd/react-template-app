import React, { FC, memo, useEffect } from "react";
import { useForm } from "Common/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { AuthAsyncActions } from "../AuthAsyncActions";
import { checkAuthorization } from "Common/checkAuthorization";
import { IAppState } from "Store/IAppState";
import { useHistory, useLocation } from "react-router";
import querystring from "query-string";
import { CustomInput } from "Components/controls/customInput/customInput";

const Authorization: FC = memo(() => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const history = useHistory();

  const token = useSelector((state: IAppState) => state.auth.token);

  useEffect(() => {
    if (checkAuthorization(token)) {
      const query = querystring.parse(search);
      query.redirect
        ? history.replace(`${query.redirect}`)
        : history.replace("/");
    }
  }, [token]);

  const dispatch = useDispatch();

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    touchedValues,
    handleSubmit,
  } = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (submitValues): void => {
      console.log(submitValues);
      dispatch(AuthAsyncActions.auth(submitValues, () => {}));
    },
    validate: (validateValues): Partial<typeof validateValues> => {
      const validateErrors: Partial<typeof validateValues> = {};
      if (validateValues.username == "") {
        validateErrors.username = t("enter_username");
      }

      if (validateValues.password == "") {
        validateErrors.password = t("enter_password");
      }

      return validateErrors;
    },
  });

  return (
    <div>
      <Helmet>
        <title>{t("authorization")}</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <h4>{t("authorization")}</h4>
        <CustomInput
          name={"username"}
          title={t("username")}
          value={values.username}
          error={errors.username}
          touch={touchedValues.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <CustomInput
          name={"password"}
          title={t("password")}
          value={values.password}
          error={errors.password}
          touch={touchedValues.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div>
          <button type="submit">{t("sign_in")}</button>
        </div>
      </form>
    </div>
  );
});

export default Authorization;
