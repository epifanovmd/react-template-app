import React from "react";
import { ObjectSchema, Shape } from "yup";

interface IUseForm<T> {
  initialValues: T;
  onSubmit?: (values: T, errors: Partial<T>) => void;
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
  const [errors, setErrors] = React.useState<Partial<T>>({});

  const _validate = async (
    _values: T,
    _finally?: (_values: Partial<T>, errors: Partial<T>) => void,
  ) => {
    if (validateSchema) {
      validateSchema
        .validate(_values, { strict: true, abortEarly: false })
        .then(() => {
          setErrors({});
          _finally && _finally(_values, {});
        })
        .catch((err) => {
          const e: Partial<T> = {};
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

  const setFieldValue = async <K extends keyof T>(name: K, value: T[K]) => {
    // const e = (validate && validate({ ...values, [name]: value })) || {};
    // setErrors({
    //   ...e,
    // });
    await _validate({ ...values, [name]: value }, () => {
      setValues({
        ...values,
        [name]: value,
      });
    });
  };

  const handleChange = async (event: any) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    // const e = (validate && validate({ ...values, [name]: value })) || {};
    // setErrors({
    //   ...e,
    // });
    await _validate({ ...values, [name]: value }, () => {
      console.log(errors);
      setValues({
        ...values,
        [name]: value,
      });
    });
  };

  const handleBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    setTouchedValues({
      ...touchedValues,
      [name]: true,
    });
    // const e = (validate && validate(values)) || {};
    // setErrors({
    //   ...e,
    // });
    await _validate(values);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await _validate(values, ({}, e) => {
      // setErrors({
      //   ...e,
      // });
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
  };
};
