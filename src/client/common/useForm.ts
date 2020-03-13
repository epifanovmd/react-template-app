import React, { useEffect } from "react";
import { ObjectSchema, Shape } from "yup";

type TCheckArray<T> = T extends any[] ? T[number] : T;
interface IUseForm<T extends object> {
  initialValues: T;
  data?: T;
  onChange?: (values: T, errors: Partial<Record<keyof T, string>>) => void;
  onSubmit?: (values: T, errors: Partial<Record<keyof T, string>>) => void;
  validate?: (values: T) => Partial<T>;
  validateSchema?: ObjectSchema<Shape<object, T>>;
}

export const useForm = <T extends object>({
  initialValues,
  data,
  onSubmit,
  onChange,
  validate,
  validateSchema,
}: IUseForm<T>) => {
  const [values, setValues] = React.useState<T>(initialValues);
  useEffect(() => {
    data && setValues(data);
  }, [data]);
  const [touchedValues, setTouchedValues] = React.useState<
    Partial<Record<keyof T | string, boolean>>
  >({});
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof T | string, string>>
  >({});

  useEffect(() => {
    onChange && onChange(values, errors);
  }, [values, errors]);

  const fieldsHelper = {
    remove: (name: keyof T, index: number) => {
      setValues((state) => {
        if (state[name]) {
          const newState = {
            ...state,
            [name]: ((state[name] as any) || []).filter(
              ({}, ind: number) => ind !== index,
            ),
          };
          _validate(newState);

          return newState;
        }

        return state;
      });
    },
    append: <K extends keyof T>(name: K, value: T[K]) => {
      setValues((state) => ({
        ...state,
        [name]: [...(state[name] as any), ...(value as any)],
      }));
    },
    handleChange: async ({ target }: React.ChangeEvent<any>) => {
      const name: keyof T = (target?.name || "").split("[")[0];
      const index = ((target?.name.match("\\[[0-9]{1,2}\\]") || [])[0] || -1)
        .split("]")[0]
        .split("[")[1];
      const key = (target?.name || "").split(".")[1];
      const value = target?.value;
      const _values = await _validate({
        ...values,
        [name]: ((values[name] as any) || []).map((item: any, ind: number) =>
          index && ind === +index ? { ...item, [key]: value } : item,
        ),
      });
      setValues(_values);
    },
    setFieldValue: async <A extends T[keyof T]>(
      name: keyof T,
      key: keyof TCheckArray<A>,
      value: TCheckArray<A>[keyof TCheckArray<A>],
      index: number,
    ) => {
      const _values = await _validate({
        ...values,
        [name]: ((values[name] as any) || []).map((item: any, ind: number) =>
          ind === index ? { ...item, [key]: value } : item,
        ),
      });
      setValues(_values);
    },
  };

  const fieldsIterate = <A extends TCheckArray<T[B]>, B extends keyof T>(
    name: B,
    fields: (val: {
      value: A;
      touched: Partial<{ [key in keyof A]: boolean }>;
      error: Partial<{ [key in keyof A]: string }>;
      fieldsName: { [key in keyof A]: string };
      fieldsHelper: typeof fieldsHelper;
      index: number;
      array: A[];
    }) => void,
  ) => {
    return (values[name] as any | []).map(
      (value: A, index: number, array: A[]) => {
        const touched: Partial<{ [key in keyof A]: boolean }> = {};
        const error: Partial<{ [key in keyof A]: string }> = {};
        const fieldsName: { [key in keyof A]: string } = {} as {
          [key in keyof A]: string;
        };

        Object.keys(value).forEach((item) => {
          fieldsName[item as keyof A] = `${name}[${index}].${item}`;
          touched[item as keyof A] = touchedValues[`${name}[${index}].${item}`];
          error[item as keyof A] = errors[`${name}[${index}].${item}`];
        });

        return fields({
          fieldsHelper,
          value,
          index,
          touched,
          error,
          fieldsName,
          array,
        });
      },
    );
  };

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
          const e: Partial<Record<keyof T | string, string>> = {};
          (err.inner as { path: keyof T }[]).map(
            (item: { path: keyof T }, index: number) => {
              e[item.path] = err.errors[index];
            },
          );
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

    return _values;
  };

  const handleClearForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouchedValues({});
  };

  const handleChange = async (event: React.ChangeEvent<any>) => {
    const target = event?.target;
    const value = target?.type === "checkbox" ? target?.checked : target?.value;
    const name = target?.name;
    const _values = await _validate({ ...values, [name]: value });
    setValues(_values);
  };

  const setFieldValue = async <K extends keyof T>(name: K, value: T[K]) => {
    const _values = await _validate({ ...values, [name]: value });
    setValues(_values);
    setTouchedValues((state) => ({
      ...state,
      [name]: true,
    }));
  };

  const handleBlur = async (event: React.FocusEvent<any>) => {
    const target = event.target;
    const name = target.name;
    name &&
      setTouchedValues((state) => ({
        ...state,
        [name]: true,
      }));
    await _validate(values);
  };

  const setFieldBlur = async (name: keyof T | string) => {
    setTouchedValues((state) => ({
      ...state,
      [name]: true,
    }));
    await _validate(values);
  };

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
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
    fieldsIterate,
    fieldsHelper,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    setFieldBlur,
    handleClear: handleClearForm,
  };
};
