import React from "react";

interface IUseForm<T> {
  initialValues: T;
  onSubmit?: (values: T, errors: Partial<T>) => void;
  validate?: (values: T) => Partial<T>;
}

interface IUseFormReturn<T> {
  values: T;
  touchedValues: Partial<Record<keyof T, boolean>>;
  errors: Partial<T>;
  handleChange: (event: any) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const useForm = <T extends {}>({
  initialValues,
  onSubmit,
  validate,
}: IUseForm<T>): IUseFormReturn<T> => {
  const [values, setValues] = React.useState<T>(initialValues);
  const [touchedValues, setTouchedValues] = React.useState<
    Partial<Record<keyof T, boolean>>
  >({});
  const [errors, setErrors] = React.useState<T | {}>({});

  const handleChange = (event: any): void => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const e = (validate && validate({ ...values, [name]: value })) || {};
    setErrors({
      ...e,
    });
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    const target = event.target;
    const name = target.name;
    setTouchedValues({
      ...touchedValues,
      [name]: true,
    });
    const e = (validate && validate(values)) || {};
    setErrors({
      ...e,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const e = (validate && validate(values)) || {};
    setErrors({
      ...e,
    });
    const touched = Object.keys(values).reduce(
      (acc, el) => ({ ...acc, [el]: true }),
      {},
    );
    setTouchedValues(touched);
    Object.keys({ ...e }).length == 0 && onSubmit && onSubmit(values, e);
  };

  return {
    values,
    touchedValues,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  };
};
