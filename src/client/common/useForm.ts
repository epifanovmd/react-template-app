import React, { useEffect } from "react";
import { ObjectSchema, Shape } from "yup";

interface IUseForm<T> {
  initialValues: T;
  onSubmit?: (values: T, errors: Partial<Record<keyof T, string>>) => void;
  validate?: (values: T) => Partial<T>;
  validateSchema?: ObjectSchema<Shape<object, Record<keyof T, string>>>;
}

export const useForm = <T>({
  initialValues,
  onSubmit,
  validate,
  validateSchema,
}: IUseForm<T>) => {
  const [values, setValues] = React.useState<T>(initialValues);
  const [touchedValues, setTouchedValues] = React.useState<
    Partial<Record<keyof T, boolean>>
  >({});
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>(
    {},
  );

  const _validate = async (
    _values: T,
    _finally?: (
      _values: Partial<T>,
      errors: Partial<Record<keyof T, string>>,
    ) => void,
  ) => {
    if (validateSchema) {
      validateSchema
        .validate(_values, { strict: true, abortEarly: false })
        .then(() => {
          setErrors({});
          _finally && _finally(_values, {});
        })
        .catch((err) => {
          const e: Partial<Record<keyof T, string>> = {};
          err.inner.map((item: { path: keyof T }, index: number) => {
            e[item.path] = err.errors[index];
          }); // => 'ValidationError'
          setErrors({
            ...e,
          });
          _finally && _finally(_values, { ...e });
        });
    } else {
      const e = validate ? validate(_values) : {};
      setErrors({
        ...e,
      });
      _finally && _finally(_values, errors);
    }
  };

  const handleClear = () => {
    setValues(initialValues);
    setErrors(initialValues);
  };

  const setFieldValue = async <K extends keyof T>(name: K, value: T[K]) => {
    await _validate({ ...values, [name]: value }, () => {
      setValues({
        ...values,
        [name]: value,
      });
    });
  };

  const handleChange = async (event: any) => {
    const target = event?.target;
    const value = target?.type === "checkbox" ? target?.checked : target?.value;
    const name = target?.name;
    await _validate({ ...values, [name]: value }, () => {
      setValues({
        ...values,
        [name]: value,
      });
    });
  };

  const handleBlur = async (event: any) => {
    const target = event?.target;
    const name = target?.name;
    name &&
      setTouchedValues({
        ...touchedValues,
        [name]: true,
      });
    await _validate(values);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await _validate(values, ({}, e) => {
      const touched = Object.keys(values).reduce(
        (acc, el) => ({ ...acc, [el]: true }),
        {},
      );
      setTouchedValues(touched);
      Object.keys({ ...e }).length == 0 && onSubmit && onSubmit(values, e);
    });
  };

  return {
    values,
    touchedValues,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    handleClear,
  };
};
