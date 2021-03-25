import React, { useCallback, useEffect, useMemo } from "react";
import { ObjectSchema, Shape } from "yup";

export const useForm = <
  T extends object,
  M extends { [key: string]: any } = { [key: string]: any }
>(
  {
    initialValues,
    initialMeta = {} as M,
    onSubmit,
    onChange,
    validate,
    validateSchema,
    validateOnInit,
    validateOnChange,
    enableReinitialize,
  }: IUseForm<T, M>,
  watch?: (keyof T)[],
): IForm<T, M> => {
  const [values, setValues] = React.useState<T>(initialValues);
  const [meta, changeMeta] = React.useState<M & { [key: string]: any }>(
    initialMeta,
  );
  const [dirty, setDirty] = React.useState<boolean>(false);
  const [touchedValues, setTouchedValues] = React.useState<
    Partial<Record<keyof T | string, boolean>>
  >({});
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof T | string, string>>
  >({});
  const getDirty = useCallback((a, b) => {
    setDirty(JSON.stringify(a) !== JSON.stringify(b));
  }, []);

  useEffect(() => {
    if (enableReinitialize) {
      const newInitialValues = { ...initialValues };

      setValues(newInitialValues);
      validateOnInit && _validate(newInitialValues);
    }
    // eslint-disable-next-line
  }, [initialValues]);

  useEffect(() => {
    if (enableReinitialize) {
      const newInitialMeta = { ...initialMeta };

      changeMeta(newInitialMeta);
    }
    // eslint-disable-next-line
  }, [initialMeta]);

  const _validate = useCallback(
    async (
      _values: T,
      _finally?: (
        _values: Partial<T>,
        errors: Partial<Record<keyof T | string, string>>,
      ) => void,
    ) => {
      let newErrors = {};

      getDirty(_values, initialValues);
      if (validateSchema) {
        await validateSchema
          .validate(_values, {
            strict: true,
            abortEarly: false,
          })
          .then(() => {
            setErrors(e => {
              if (Object.keys(e).length > 0) {
                return {};
              }
              Object.keys(e).forEach(key => {
                delete e[key];
              });

              return e;
            });
            _finally && _finally(_values, {});
          })
          .catch(err => {
            setErrors(e => {
              const inner = (err.inner || []) as {
                path: keyof T;
                errors: string[];
              }[];
              const prevErrors = { ...e };

              Object.keys(e).forEach(key => {
                delete e[key];
              });

              inner.forEach(item => {
                const split = (item.path as string).split(".");

                if (split[1]) {
                  if (split[0][split[0].length - 1] !== "]") {
                    e[split[0] as keyof T] = `${(item.errors || [])[0]}`;
                  } else {
                    e[`${split[0]}.${split[1]}` as keyof T] = `${
                      (item.errors || [])[0]
                    }`;
                  }
                } else {
                  e[item.path] = (item.errors || [])[0];
                }
              });

              const prevKeys = Object.keys(prevErrors);
              const eKeys = Object.keys(e);

              if (
                prevKeys.length !== eKeys.length ||
                prevKeys.some(key => prevErrors[key] !== e[key])
              ) {
                // eslint-disable-next-line no-param-reassign
                e = { ...e };
              }

              newErrors = e;
              _finally && _finally(_values, e);

              return e;
            });
          });
      } else {
        const e: Partial<Record<keyof T | string, string>> | null = validate
          ? validate(_values, meta)
          : null;

        if (e) {
          newErrors = e;
        }
        setErrors(err => (e ? e : err));
        _finally && _finally(_values, { ...(e as any) });
      }

      const keys = Object.keys(newErrors);

      return Promise.resolve({
        hasErrors: keys.length > 0,
        count: keys.length,
        errors: newErrors,
      });
    },
    [getDirty, initialValues, validateSchema, validate, meta],
  );

  useEffect(() => {
    onChange && onChange(values, meta, errors);
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
    [_validate],
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

            validateOnChange && _validate(newState);

            return newState;
          }

          return state;
        });
      },
      append: <K extends keyof T>(name: K, value: T[K]) => {
        setValues(state => {
          const newState = {
            ...state,
            [name]: [...(state[name] as any), ...(value as any)],
          };

          validateOnChange && _validate(newState);

          return newState;
        });
      },
      handleChange: ({ target }: React.ChangeEvent<any>) => {
        const name: keyof T = (target?.name || "").split("[")[0];
        const index = ((target?.name.match("\\[[0-9]{1,2}\\]") || [])[0] || -1)
          .split("]")[0]
          .split("[")[1];
        const key = (target?.name || "").split(".")[1];
        const value = target?.value;

        setValues(state => {
          state[name] = ((state[name] as any) || []).map(
            (item: any, ind: number) =>
              index && ind === +index
                ? {
                    ...item,
                    [key]: value,
                  }
                : item,
          );
          let newValues = state;

          if ((watch && watch.some(item => item === name)) || !watch) {
            newValues = {
              ...state,
            };
          }

          validateOnChange && _validate(newValues);

          return newValues;
        });
      },
      setFieldValue: <K extends keyof T, A extends T[K]>(
        name: K,
        key: keyof TCheckArray<A>,
        value:
          | ((state: T) => TCheckArray<A>[keyof TCheckArray<A>])
          | TCheckArray<A>[keyof TCheckArray<A>],
        index: number,
        touch?: boolean,
      ) => {
        setValues(state => {
          state[name] = ((state[name] as any) || []).map(
            (item: any, ind: number) =>
              ind === +index
                ? {
                    ...item,
                    [key]:
                      typeof value === "function"
                        ? (value as (
                            state: T,
                          ) => TCheckArray<A>[keyof TCheckArray<A>])(state)
                        : value,
                  }
                : item,
          );
          let newValues = state;

          if (
            (watch && watch.some(item => item === name || item === key)) ||
            !watch
          ) {
            newValues = {
              ...state,
            };
          }

          validateOnChange && _validate(newValues);

          return newValues;
        });
        !touchedValues[name] &&
          touch &&
          setTouchedValues(state => ({
            ...state,
            [name]: true,
          }));
      },
    }),
    [validateOnChange, _validate, watch, touchedValues],
  );

  const fieldsIterate = useCallback(
    <A extends TCheckArray<T[B]>, B extends keyof T>(
      name: B,
      fields: (val: {
        value: A;
        touched: Partial<{ [key in keyof A]: boolean }>;
        error: Partial<{ [key in keyof A]: string }>;
        fieldNames: { [key in keyof A]: string };
        fieldsHelper: typeof fieldsHelper;
        index: number;
        array: A[];
      }) => void,
    ) =>
      ((values[name] as any) || []).map(
        (value: A, index: number, array: A[]) => {
          const touched: Partial<{ [key in keyof A]: boolean }> = {};
          const error: Partial<{ [key in keyof A]: string }> = {};
          const fieldNames: { [key in keyof A]: string } = {} as {
            [key in keyof A]: string;
          };

          Object.keys(value).forEach(item => {
            fieldNames[item as keyof A] = `${name}[${index}].${item}`;
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
            fieldNames,
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
  }, [initialValues]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      const target = event?.target;
      const value =
        target?.type === "checkbox" || target?.type === "radio"
          ? target?.checked
          : target?.value;
      const name = target?.name;

      if (
        (target?.type === "checkbox" || target?.type === "radio") &&
        !touchedValues[name as keyof T]
      ) {
        setTouchedValues(state => ({
          ...state,
          [name]: true,
        }));
      }

      setValues(state => {
        state[name as keyof T] = value;
        let newValues = state;

        if ((watch && watch.some(item => item === name)) || !watch) {
          newValues = {
            ...state,
          };
        }

        validateOnChange && _validate(newValues);

        return newValues;
      });
    },
    [touchedValues, watch, validateOnChange, _validate],
  );

  const setFieldValue = useCallback(
    (
      name: keyof T,
      value: ((state: T) => T[keyof T]) | T[keyof T],
      touch?: boolean,
    ) => {
      setValues(state => {
        state[name] =
          typeof value === "function"
            ? (value as (state: T) => T[keyof T])(state)
            : value;
        let newValues = state;

        if ((watch && watch.some(item => item === name)) || !watch) {
          newValues = {
            ...state,
          };
        }

        validateOnChange && _validate(newValues);

        return newValues;
      });
      !touchedValues[name] &&
        touch &&
        setTouchedValues(state => ({
          ...state,
          [name]: true,
        }));
    },
    [touchedValues, watch, validateOnChange, _validate],
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
        validateOnChange && _validate(values);
      }
    },
    [touchedValues, validateOnChange, _validate, values],
  );

  const setFieldBlur = useCallback(
    (name: keyof T | string) => {
      if (name && !touchedValues[name]) {
        setTouchedValues(state => ({
          ...state,
          [name]: true,
        }));
        validateOnChange && _validate(values);
      }
    },
    [touchedValues, validateOnChange, _validate, values],
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

              field.forEach((val, ind) => {
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
        Object.keys({ ...e }).length === 0 &&
          onSubmit &&
          onSubmit(values, meta, e);
      });
    },
    [_validate, values, onSubmit, meta],
  );

  const valid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const validateForm = useCallback(async () => {
    const { count, errors, hasErrors } = await _validate(values);

    const keys = Object.keys(errors);

    keys.forEach(key => {
      setTouchedValues(state => ({
        ...state,
        [key]: true,
      }));
    });

    return Promise.resolve({ count, errors, hasErrors });
  }, [_validate, values]);

  const setMeta = useCallback(
    (name: keyof M, value: ((state: M) => M[keyof M]) | M[keyof M]) => {
      changeMeta(state => ({
        ...state,
        [name]: typeof value === "function" ? (value as any)(state) : value,
      }));
    },
    [],
  );

  return {
    dirty,
    valid,
    values,
    meta,
    touchedValues,
    errors,
    fieldNames,
    onSetValues,
    handleChange,
    handleBlur,
    setMeta,
    setFieldValue,
    setFieldBlur,
    handleSubmit,
    fieldsIterate,
    fieldsHelper,
    handleClearForm,
    validateForm,
  };
};

type TCheckArray<T> = T extends any[] ? T[number] : T;

type SubType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
  }[keyof Base]
>;

interface IUseForm<
  T,
  M extends { [key: string]: any } = { [key: string]: any }
> {
  initialValues: T;
  initialMeta?: M & { [key: string]: any };
  onChange?: (
    values: T,
    meta: M,
    errors: Partial<Record<keyof T | string, string>>,
  ) => void;
  onSubmit?: (
    values: T,
    meta: M,
    errors: Partial<Record<keyof T | string, string>>,
  ) => void;
  validate?: (values: T, meta: M) => Partial<Record<keyof T | string, string>>;
  validateSchema?: ObjectSchema<
    Shape<object | undefined, Partial<Record<keyof T, any>>>,
    object
  >;
  validateOnInit?: boolean;
  validateOnChange?: boolean;
  enableReinitialize?: boolean;
}

export interface IFieldsHelper<T> {
  remove: (name: keyof SubType<T, Array<any>>, index: number) => void;
  append: <K extends keyof SubType<T, Array<any>>>(
    name: K,
    value: T[K],
  ) => void;
  handleChange: ({ target }: React.ChangeEvent<any>) => void;
  setFieldValue: <K extends keyof SubType<T, Array<any>>, A extends T[K]>(
    name: K,
    key: keyof TCheckArray<A>,
    value:
      | ((state: T) => TCheckArray<A>[keyof TCheckArray<A>])
      | TCheckArray<A>[keyof TCheckArray<A>],
    index: number,
    touch?: boolean,
  ) => void;
}

export interface IForm<
  T,
  M extends { [key: string]: any } = { [key: string]: any }
> {
  dirty: boolean;
  valid: boolean;
  values: T;
  meta: M & { [key: string]: any };
  touchedValues: Partial<Record<keyof T | string, boolean>>;
  errors: Partial<Record<keyof T | string, string>>;
  fieldNames: Record<keyof T, string>;
  onSetValues: (values: T) => void;
  handleChange: (event: React.ChangeEvent<any>) => void;
  handleBlur: (event: React.FocusEvent<any>) => void;
  setMeta: (
    name: keyof M,
    value: ((state: M) => M[keyof M]) | M[keyof M],
  ) => void;
  setFieldValue: (
    name: keyof T,
    value: ((state: T) => T[keyof T]) | T[keyof T],
    touch?: boolean,
  ) => void;
  setFieldBlur: (name: keyof T | string) => void;
  handleSubmit: () =>
    | void
    | ((event?: React.FormEvent<HTMLFormElement>) => void);
  fieldsIterate: <
    A extends TCheckArray<T[B]>,
    B extends keyof SubType<T, Array<any>>
  >(
    name: B,
    fields: (val: {
      value: A;
      touched: Partial<{ [key in keyof A]: boolean }>;
      error: Partial<{ [key in keyof A]: string }>;
      fieldNames: { [key in keyof A]: string };
      fieldsHelper: IFieldsHelper<T>;
      index: number;
      array: A[];
    }) => void,
  ) => void;
  fieldsHelper: IFieldsHelper<T>;
  handleClearForm: () => void;
  validateForm: () => Promise<{
    hasErrors: boolean;
    count: number;
    errors: Partial<Record<keyof T | string, string>>;
  }>;
}
