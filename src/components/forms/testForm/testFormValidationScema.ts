import * as Yup from "yup";

export const testFormValidationSchema = (): any =>
  Yup.object().shape({
    // firstName: Yup.string()
    //   .min(2, "Минимальная длина названия 2 символа")
    //   .required("Пожалуйста, заполните поле"),
    // lastName: Yup.string().required("Пожалуйста, заполните поле"),
    // email: Yup.string()
    //   .email("Это не email")
    //   .required("Пожалуйста, заполните поле"),
  });
