import React, { useEffect } from "react";
import { ObjectSchema, Shape } from "yup";

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
    handleChange: async ({ target }: any) => {
      const name: keyof T = (target?.name || "").split("[")[0];
      const index = ((target?.name.match("\\[[0-9]{1,2}\\]") || [])[0] || -1)
        .split("]")[0]
        .split("[")[1];
      const key = (target?.name || "").split(".")[1];
      const value = target?.value;

      const newValue = {
        [name]: ((values[name] as any) || []).map((item: any, ind: number) =>
          index && ind === +index ? { ...item, [key]: value } : item,
        ),
      };

      await _validate({ ...values, ...newValue }, () => {
        setValues((state) => ({
          ...state,
          ...newValue,
        }));
      });
    },
    setFieldValue: async <A extends T[keyof T]>(
      name: keyof T,
      // @ts-ignore
      key: keyof A[number],
      // @ts-ignore
      value: A[number][keyof A[number]],
      index: number,
    ) => {
      const newValue = {
        [name]: ((values[name] as any) || []).map((item: any, ind: number) =>
          ind === index ? { ...item, [key]: value } : item,
        ),
      };

      await _validate({ ...values, ...newValue }, () => {
        setValues((state) => ({
          ...state,
          ...newValue,
        }));
      });
    },
  };

  // @ts-ignore
  const fieldsIterate = <A extends T[B][number], B extends keyof T>(
    name: B,
    fields: (val: {
      value: { [key in keyof A]: A[keyof A] };
      touched: { [key in keyof A]: boolean };
      error: { [key in keyof A]: string };
      fieldsName: { [key in keyof A]: string };
      fieldsHelper: typeof fieldsHelper;
      index: number;
      array: A[];
    }) => any,
  ) => {
    return (values[name] as any | []).map(
      (value: A, index: number, array: A[]) => {
        const fieldsName: any = {};
        const touched: any = {};
        const error: any = {};
        Object.keys(value).forEach((item) => {
          (fieldsName as any)[item] = `${name}[${index}].${item}`;
          (touched as any)[item] = touchedValues[`${name}[${index}].${item}`];
          (error as any)[item] = errors[`${name}[${index}].${item}`];
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

  const handleClearForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouchedValues({});
  };

  const handleChange = async (event: any) => {
    const target = event?.target;
    const value = target?.type === "checkbox" ? target?.checked : target?.value;
    const name = target?.name;
    await _validate({ ...values, [name]: value }, () => {
      setValues((state) => ({
        ...state,
        [name]: value,
      }));
    });
  };

  const setFieldValue = async <K extends keyof T>(name: K, value: T[K]) => {
    await _validate({ ...values, [name]: value }, () => {
      setValues((state) => ({
        ...state,
        [name]: value,
      }));
      setTouchedValues((state) => ({
        ...state,
        [name]: true,
      }));
    });
  };

  const handleBlur = async (event: any) => {
    const target = event?.target;
    const name = target?.name;
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
