import React, { useCallback, useEffect, useMemo } from "react";
import { ObjectSchema, Shape } from "yup";

type TCheckArray<T> = T extends any[] ? T[number] : T;

interface IUseForm<T extends object> {
  initialValues: T;
  onChange?: (values: T, errors: Partial<Record<keyof T, string>>) => void;
  onSubmit?: (values: T, errors: Partial<Record<keyof T, string>>) => void;
  validate?: (values: T) => Partial<T>;
  validateSchema?: ObjectSchema<Shape<object, T>>;
  validateOnInit?: boolean;
}
export const useForm = <T extends object>({
  initialValues,
  onSubmit,
  onChange,
  validate,
  validateSchema,
  validateOnInit,
}: IUseForm<T>) => {
  const [values, setValues] = React.useState<T>(initialValues);
  const [touchedValues, setTouchedValues] = React.useState<
    Partial<Record<keyof T | string, boolean>>
  >({});
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof T | string, string>>
  >({});

  const _validate = useCallback(
    (
      _values: T,
      _finally?: (
        _values: Partial<T>,
        errors: Partial<Record<keyof T, string>>,
      ) => void,
    ) => {
      if (validateSchema) {
        validateSchema
          .validate(_values, {
            strict: true,
            abortEarly: false,
          })
          .then(() => {
            setErrors({});
            _finally && _finally(_values, {});
          })
          .catch(err => {
            const e: Partial<Record<keyof T | string, string>> = {};

            (
              (err.inner || []) as { path: keyof T; errors: string[] }[]
            ).forEach(item => {
              const split = (item.path as string).split(".");

              if (split[1]) {
                if (split[0][split[0].length - 1] !== "]") {
                  e[split[0] as keyof T] = `${
                    e[split[0]] ? `${e[split[0]]}, ` : ""
                  }${(item.errors || []).join(",")}`;
                } else {
                  e[`${split[0]}.${split[1]}` as keyof T] = `${
                    e[`${split[0]}.${split[1]}`]
                      ? `${e[`${split[0]}.${split[1]}`]}, `
                      : ""
                  }${(item.errors || []).join(",")}`;
                }
              } else {
                e[item.path] = (item.errors || []).join(",");
              }
            });
            setErrors({ ...e });
            _finally && _finally(_values, { ...e });
          });
      } else {
        const e = validate ? validate(_values) : {};

        setErrors({ ...e });
        _finally && _finally(_values, { ...e });
      }

      return _values;
    },
    [setErrors, validateSchema, validate],
  );

  useEffect(() => {
    onChange && onChange(values, errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, errors]);

  useEffect(() => {
    validateOnInit && _validate(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSetValues = useCallback(
    (_values: T) => {
      setValues(_values);
      _validate(_values);
    },
    [setValues, _validate],
  );

  const getFields = useCallback(() => {
    const obj: Record<keyof T, string> = {} as Record<keyof T, string>;

    Object.keys(initialValues).forEach(key => {
      obj[key as keyof T] = key;
    });

    return obj;
  }, [initialValues]);

  const fieldNames = useMemo(() => getFields(), [getFields]);

  const fieldsHelper = useMemo(
    () => ({
      remove: (name: keyof T, index: number) => {
        setValues(state => {
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
        setValues(state => ({
          ...state,
          [name]: [...(state[name] as any), ...(value as any)],
        }));
      },
      handleChange: ({ target }: React.ChangeEvent<any>) => {
        const name: keyof T = (target?.name || "").split("[")[0];
        const index = ((target?.name.match("\\[[0-9]{1,2}\\]") || [])[0] || -1)
          .split("]")[0]
          .split("[")[1];
        const key = (target?.name || "").split(".")[1];
        const value = target?.value;

        setValues(state => {
          const newValues = {
            ...state,
            [name]: ((state[name] as any) || []).map((item: any, ind: number) =>
              index && ind === +index
                ? {
                    ...item,
                    [key]: value,
                  }
                : item,
            ),
          };

          _validate(newValues);

          return newValues;
        });
      },
      setFieldValue: <A extends T[keyof T]>(
        name: keyof T,
        key: keyof TCheckArray<A>,
        value:
          | ((state: T) => TCheckArray<A>[keyof TCheckArray<A>])
          | TCheckArray<A>[keyof TCheckArray<A>],
        index: number,
      ) => {
        setValues(state => {
          const newValues = {
            ...state,
            [name]: ((state[name] as any) || []).map((item: any, ind: number) =>
              ind === index
                ? {
                    ...item,
                    [key]:
                      typeof value === "function"
                        ? (
                            value as
                            (state: T) => TCheckArray<A>[keyof TCheckArray<A>]
                          )(state)
                        : value,
                  }
                : item,
            ),
          };

          _validate(newValues);

          return newValues;
        });
      },
    }),
    [setValues, _validate],
  );

  const fieldsIterate = useCallback(
    <A extends TCheckArray<T[B]>, B extends keyof T>(
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
    ) =>
      ((values[name] as any) || []).map(
        (value: A, index: number, array: A[]) => {
          const touched: Partial<{ [key in keyof A]: boolean }> = {};
          const error: Partial<{ [key in keyof A]: string }> = {};
          const fieldsName: { [key in keyof A]: string } =
            {} as
            {
              [key in keyof A]: string;
            };

          Object.keys(value).forEach(item => {
            fieldsName[item as keyof A] = `${name}[${index}].${item}`;
            touched[item as keyof A] =
              touchedValues[`${name}[${index}].${item}`];
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
      ),
    [fieldsHelper, values, touchedValues, errors],
  );

  const handleClearForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouchedValues({});
  }, [setValues, initialValues, setErrors, setTouchedValues]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      const target = event?.target;
      const value =
        target?.type === "checkbox" ? target?.checked : target?.value;
      const name = target?.name;

      setValues(state => {
        const newValues = {
          ...state,
          [name]: value,
        };

        _validate(newValues);

        return newValues;
      });
    },
    [setValues, _validate],
  );

  const setFieldValue = useCallback(
    <K extends keyof T>(name: K, value: ((state: T) => T[K]) | T[K]) => {
      setValues(state => {
        const newValues = {
          ...state,
          [name]:
            typeof value === "function"
              ? (value as (state: T) => T[K])(state)
              : value,
        };

        _validate(newValues);

        return newValues;
      });
      !touchedValues[name] &&
        setTouchedValues(state => ({
          ...state,
          [name]: true,
        }));
    },
    [setValues, setTouchedValues, _validate, touchedValues],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<any>) => {
      const { target } = event;
      const { name } = target;

      if (name && !touchedValues[name]) {
        setTouchedValues(state => ({
          ...state,
          [name]: true,
        }));
        _validate(values);
      }
    },
    [setTouchedValues, _validate, values, touchedValues],
  );

  const setFieldBlur = useCallback(
    (name: keyof T | string) => {
      if (name && !touchedValues[name]) {
        setTouchedValues(state => ({
          ...state,
          [name]: true,
        }));
        _validate(values);
      }
    },
    [setTouchedValues, _validate, values, touchedValues],
  );

  const handleSubmit = useCallback(
    (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      _validate(values, ({}, e) => {
        setTouchedValues(
          (Object.keys(values) as (keyof T)[]).reduce((acc, el) => {
            const field = values[el] as any;

            if (
              Array.isArray(field) &&
              field[0] &&
              typeof field[0] === "object" &&
              !Array.isArray(field[0])
            ) {
              const obj: any = {};
              const arr: any[] = field;

              arr.forEach((val, ind) => {
                Object.keys(val).forEach(key => {
                  obj[`${el}[${ind}].${key}`] = true;
                });
              });

              return {
                ...acc,
                ...obj,
              };
            }

            return {
              ...acc,
              [el]: true,
            };
          }, {}),
        );
        Object.keys({ ...e }).length === 0 && onSubmit && onSubmit(values, e);
      });
    },
    [values, onSubmit, _validate],
  );

  return {
    values,
    touchedValues,
    errors,
    fieldNames,
    onSetValues,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldBlur,
    handleSubmit,
    fieldsIterate,
    fieldsHelper,
    handleClearForm,
  };
};
