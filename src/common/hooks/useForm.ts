import React, { useCallback, useEffect, useMemo } from "react";
import { ObjectSchema, Shape } from "yup";

export const useForm = <T extends object>(
  {
    initialValues: _initialValues,
    onSubmit,
    onChange,
    validate,
    validateSchema,
    validateOnInit,
    validateOnChange,
    enableReinitialize,
  }: IUseForm<T>,
  watch?: (keyof T)[],
): IForm<T> => {
  const initialValues = React.useRef<T>({ ..._initialValues });
  const [values, setValues] = React.useState<T>({ ..._initialValues });
  const [dirty, setDirty] = React.useState<boolean>(false);
  const [touchedValues, setTouchedValues] = React.useState<
    Partial<Record<keyof T | string, boolean>>
  >({});
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof T | string, string>>
  >({});

  const getDirty = useCallback(
    (a: T, b: T) => {
      const isDirty = JSON.stringify(a) !== JSON.stringify(b);

      if (dirty !== isDirty) {
        setDirty(isDirty);
      }
    },
    [dirty],
  );

  const [isInit, setInit] = React.useState(false);

  useEffect(() => {
    if (enableReinitialize) {
      setValues({ ..._initialValues });
      initialValues.current = { ..._initialValues };
      getDirty(_initialValues, initialValues.current);
      validateOnChange && validateOnInit && validateValues(_initialValues);
    }
    // eslint-disable-next-line
  }, [_initialValues]);

  useEffect(() => {
    onChange && onChange(values, errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, errors]);

  useEffect(() => {
    validateOnInit && validateValues(values);
    setInit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (validateOnChange && isInit) {
      validateValues(values).then().catch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateSchema, validate]);

  const validateValues = useCallback(
    async (
      validationValues: T,
      afterValidate?: (
        _values: Partial<T>,
        errors: Partial<Record<keyof T | string, string>>,
      ) => void,
    ) => {
      let newErrors = {};

      if (validateSchema) {
        await validateSchema
          .validate(validationValues, {
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

              return { ...e };
            });
            afterValidate && afterValidate(validationValues, {});
          })
          .catch(err => {
            if (err.sourceURL) {
              throw new Error(
                `ERROR in - column:${err.column}, line:${err.line}, sourceURL:${err.sourceURL}`,
              );
            }
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
              afterValidate && afterValidate(validationValues, e);

              return e;
            });
          });
      } else {
        const e: Partial<Record<keyof T | string, string>> | null = validate
          ? validate(validationValues)
          : null;

        if (e) {
          newErrors = e;
        }
        setErrors(err => (e ? e : err));
        afterValidate && afterValidate(validationValues, { ...(e as any) });
      }

      const keys = Object.keys(newErrors);

      return Promise.resolve({
        hasErrors: keys.length > 0,
        count: keys.length,
        errors: newErrors,
      });
    },
    [validate, validateSchema],
  );

  const onSetValues = useCallback(
    (newValues: T) => {
      setValues(newValues);
      getDirty(newValues, initialValues.current);
      validateValues(newValues).then().catch();
    },
    [getDirty, validateValues],
  );

  const getFields = useCallback(() => {
    const obj: Record<keyof T, string> = {} as Record<keyof T, string>;

    Object.keys(initialValues.current).forEach(key => {
      obj[key as keyof T] = key;
    });

    return obj;
  }, []);

  const fieldNames = useMemo(() => getFields(), [getFields]);

  const isWatch = useCallback(
    (name: (keyof T | string)[]) =>
      (watch && watch.some(item => name.some(key => key === item))) || !watch,
    [watch],
  );

  const _setTouch = useCallback(
    (name: keyof T | string, touch: boolean, onSuccess?: () => void) => {
      if (!touchedValues[name] && touch) {
        setTouchedValues(state => {
          state[name] = true;

          return isWatch([name]) ? { ...state } : state;
        });

        onSuccess?.();
      }
    },
    [isWatch, touchedValues],
  );

  const _setValue = useCallback(
    (name: keyof T, value: ((state: T) => T[keyof T]) | T[keyof T]) =>
      setValues(state => {
        state[name] =
          typeof value === "function"
            ? (value as (state: T) => T[keyof T])(state)
            : value;

        const newState = isWatch([name]) ? { ...state } : state;

        validateOnChange && validateValues(newState);
        getDirty(newState, initialValues.current);

        return newState;
      }),
    [getDirty, isWatch, validateOnChange, validateValues],
  );

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

            validateOnChange && validateValues(newState);

            return newState;
          }

          return state;
        });
        setErrors(state => {
          const newErrors = { ...state };

          Object.keys(newErrors).forEach(key => {
            if (key.includes(`[${index}]`)) {
              delete newErrors[key];
            }
          });

          return newErrors;
        });
        setTouchedValues(state => {
          const newTouchedValues = { ...state };

          Object.keys(newTouchedValues).forEach(key => {
            if (key.includes(`[${index}]`)) {
              delete newTouchedValues[key];
            }
          });

          return newTouchedValues;
        });
      },
      append: <K extends keyof T>(
        name: K,
        value: TObjectPartial<TCheckArray<T[K]>>,
      ) => {
        setValues(state => {
          const newState = {
            ...state,
            [name]: [...(state[name] as any), value],
          };

          validateOnChange && validateValues(newState);
          getDirty(newState, initialValues.current);

          return newState;
        });
      },
      replace: <K extends keyof T>(
        name: K,
        index: number,
        value: TObjectPartial<TCheckArray<T[K]>>,
      ) => {
        setValues(state => {
          const newState = {
            ...state,
            [name]: (state[name] as any).map((item: any, ind: number) =>
              ind === index ? value : item,
            ),
          };

          validateOnChange && validateValues(newState);
          getDirty(newState, initialValues.current);

          return newState;
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
                        ? (
                            value as (
                              state: T,
                            ) => TCheckArray<A>[keyof TCheckArray<A>]
                          )(state)
                        : value,
                  }
                : item,
          );

          const newState = isWatch([name, key as string])
            ? { ...state }
            : state;

          validateOnChange && validateValues(state);
          getDirty(newState, initialValues.current);

          return newState;
        });
        _setTouch(`${name}[${index}].${key}`, !!touch);
      },
      setFieldBlur: <K extends keyof T, A extends T[K]>(
        name: K,
        key: keyof TCheckArray<A>,
        index: number,
      ) => {
        _setTouch(`${name}[${index}].${key}`, true);
      },
    }),
    [_setTouch, getDirty, isWatch, validateOnChange, validateValues],
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
      }) => JSX.Element,
    ) =>
      ((values[name] as any) || []).map(
        (value: A, index: number, array: A[]) => {
          const touched: Partial<{ [key in keyof A]: boolean }> = {};
          const error: Partial<{ [key in keyof A]: string }> = {};
          const fieldNames: { [key in keyof A]: string } = {} as {
            [key in keyof A]: string;
          };

          Object.keys(value).forEach(item => {
            fieldNames[item as keyof A] = item;
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
    [values, fieldsHelper, touchedValues, errors],
  );

  const handleClearForm = useCallback((data: T | void) => {
    if (data) {
      initialValues.current = { ...data };
      setValues({ ...data });
    } else {
      setValues({ ...initialValues.current });
    }

    setErrors({});
    setTouchedValues({});
    setDirty(false);
  }, []);

  const setFieldValue = useCallback(
    (
      name: keyof T,
      value: ((state: T) => T[keyof T]) | T[keyof T],
      touch?: boolean,
    ) => {
      _setValue(name, value);
      _setTouch(name, !!touch);
    },
    [_setValue, _setTouch],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<any>) => {
      _setTouch(event.target.name, true, () => {
        validateOnChange && validateValues(values);
      });
    },
    [_setTouch, validateOnChange, validateValues, values],
  );

  const setFieldBlur = useCallback(
    (name: keyof T | string) => {
      _setTouch(name, true, () => {
        validateOnChange && validateValues(values);
      });
    },
    [_setTouch, validateOnChange, validateValues, values],
  );

  const valid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const validateForm = useCallback(async () => {
    const { count, errors, hasErrors } = await validateValues(values);

    Object.keys(errors).forEach(key => {
      _setTouch(key, true);
    });

    return Promise.resolve({ count, errors, hasErrors });
  }, [_setTouch, validateValues, values]);

  const handleSubmit = useCallback(
    (params?: any) => {
      if (!params?.withoutValidate) {
        validateValues(values, ({}, e) => {
          setTouchedValues(() =>
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
            onSubmit(values, {
              dirty,
              valid,
              values,
              touchedValues,
              errors,
              fieldNames,
              onSetValues,
              handleBlur,
              setFieldValue,
              setFieldBlur,
              handleSubmit,
              fieldsIterate,
              fieldsHelper,
              handleClearForm,
              validateForm,
            });
        })
          .then()
          .catch();
      } else {
        onSubmit &&
          onSubmit(values, {
            dirty,
            valid,
            values,
            touchedValues,
            errors,
            fieldNames,
            onSetValues,
            handleBlur,
            setFieldValue,
            setFieldBlur,
            handleSubmit,
            fieldsIterate,
            fieldsHelper,
            handleClearForm,
            validateForm,
          });
      }
    },
    [
      dirty,
      errors,
      fieldNames,
      fieldsHelper,
      fieldsIterate,
      handleBlur,
      handleClearForm,
      onSetValues,
      onSubmit,
      setFieldBlur,
      setFieldValue,
      touchedValues,
      valid,
      validateForm,
      validateValues,
      values,
    ],
  );

  return {
    dirty,
    valid,
    values,
    touchedValues,
    errors,
    fieldNames,
    onSetValues,
    handleBlur,
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
type TObjectPartial<T> = T extends object ? Partial<T> : T;

type SubType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
  }[keyof Base]
>;

interface IUseForm<T> {
  initialValues: T;
  onChange?: (
    values: T,
    errors: Partial<Record<keyof T | string, string>>,
  ) => void;
  onSubmit?: (values: T, data: IForm<T>) => void;
  validate?: (values: T) => Partial<Record<keyof T | string, string>>;
  validateSchema?: ObjectSchema<
    Shape<object | undefined, Partial<Record<keyof T, any>>>,
    Object
  >;
  validateOnInit?: boolean;
  validateOnChange?: boolean;
  enableReinitialize?: boolean;
}

export interface IFieldsHelper<T> {
  remove: (name: keyof SubType<T, Array<any>>, index: number) => void;
  append: <K extends keyof SubType<T, Array<any>>>(
    name: K,
    value: TObjectPartial<TCheckArray<T[K]>>,
  ) => void;
  replace: <K extends keyof SubType<T, Array<any>>>(
    name: K,
    index: number,
    value: TObjectPartial<TCheckArray<T[K]>>,
  ) => void;
  setFieldValue: <K extends keyof SubType<T, Array<any>>, A extends T[K]>(
    name: K,
    key: keyof TCheckArray<A>,
    value:
      | ((state: T) => TCheckArray<A>[keyof TCheckArray<A>])
      | TCheckArray<A>[keyof TCheckArray<A>],
    index: number,
    touch?: boolean,
  ) => void;
  setFieldBlur: <K extends keyof SubType<T, Array<any>>, A extends T[K]>(
    name: K,
    key: keyof TCheckArray<A>,
    index: number,
  ) => void;
}

export interface IForm<T> {
  dirty: boolean;
  valid: boolean;
  values: T;
  touchedValues: Partial<Record<keyof T | string, boolean>>;
  errors: Partial<Record<keyof T | string, string>>;
  fieldNames: Record<keyof T, string>;
  onSetValues: (values: T) => void;
  handleBlur: (event: React.FocusEvent<any>) => void;
  setFieldValue: (
    name: keyof T,
    value: ((state: T) => T[keyof T]) | T[keyof T],
    touch?: boolean,
  ) => void;
  setFieldBlur: (name: keyof T | string) => void;
  handleSubmit: (params: { withoutValidate?: boolean } | unknown) => void;
  fieldsIterate: <
    A extends TCheckArray<T[B]>,
    B extends keyof SubType<T, Array<any>>,
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
    }) => JSX.Element,
  ) => JSX.Element[];
  fieldsHelper: IFieldsHelper<T>;
  handleClearForm: (values: T | void) => void;
  validateForm: () => Promise<{
    hasErrors: boolean;
    count: number;
    errors: Partial<Record<keyof T | string, string>>;
  }>;
}
