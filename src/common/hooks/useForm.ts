import React, { useCallback, useEffect, useMemo } from "react";
import { ObjectSchema, Shape } from "yup";

const isFunction = <T extends Function, U>(term: T | U): term is T =>
  typeof term === "function";

const lambdaFunc = <V, T>(value: V, ctx: T) =>
  isFunction(value) ? value(ctx) : value;

interface IGetDirty {
  (a: object, b: object, prevDirty?: boolean): {
    then: (callback: (dirty: boolean) => void) => void;
  };
}

const getDirty: IGetDirty = (a, b, prevDirty) => {
  const isDirty = JSON.stringify(a) !== JSON.stringify(b);

  if (prevDirty === undefined || prevDirty !== isDirty) {
    return {
      then: callback => callback(isDirty),
    };
  }

  return {
    // eslint-disable-next-line no-empty-function
    then: () => {},
  };
};

interface IValidateFunc<T> {
  (
    values: T,
    validation: {
      validate?: IValidateCallback<T>;
      validateSchema?: IValidateSchema<T>;
    },
  ): {
    values: Partial<T>;
    errors: Partial<Record<keyof T | string, string>>;
  };
}

const validateValues = async <T>(
  ...args: Parameters<IValidateFunc<T>>
): Promise<ReturnType<IValidateFunc<T>>> => {
  const [values, { validate, validateSchema }] = args;

  let errors: any = {};

  if (validateSchema) {
    await validateSchema
      .validate(values, {
        strict: true,
        abortEarly: false,
      })
      .then(() => {
        errors = {};
      })
      .catch(err => {
        if (err.sourceURL) {
          throw new Error(
            `ERROR in - column:${err.column}, line:${err.line}, sourceURL:${err.sourceURL}`,
          );
        }

        const inner = (err.inner || []) as {
          path: keyof T;
          errors: string[];
        }[];

        inner.forEach(item => {
          const split = (item.path as string).split(".");

          if (split[1]) {
            if (split[0][split[0].length - 1] !== "]") {
              errors[split[0] as keyof T] = `${(item.errors || [])[0]}`;
            } else {
              errors[`${split[0]}.${split[1]}` as keyof T] = `${
                (item.errors || [])[0]
              }`;
            }
          } else {
            errors[item.path] = (item.errors || [])[0];
          }
        });
      });
  } else {
    const e: Partial<Record<keyof T | string, string>> | null = validate
      ? validate(values)
      : null;

    if (e) {
      errors = e;
    }
  }

  return Promise.resolve({ values, errors });
};

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

  const [isInit, setInit] = React.useState(false);

  const _checkWatch = useCallback(
    (name: (keyof T | string)[]) =>
      (watch && watch.some(item => name.some(key => key === item))) || !watch,
    [watch],
  );

  const _validate = useCallback(
    (values: T) =>
      validateValues<T>(values, { validate, validateSchema }).then(
        ({ values: _values, errors: _errors }) => {
          const prevKeys = Object.keys(errors);
          const errorKeys = Object.keys(_errors);

          if (
            prevKeys.length !== errorKeys.length ||
            prevKeys.some(key => errors[key] !== _errors[key])
          ) {
            setErrors(_errors);
          }

          return _errors;
        },
      ),
    [errors, validate, validateSchema],
  );

  useEffect(() => {
    if (enableReinitialize) {
      setValues({ ..._initialValues });
      initialValues.current = { ..._initialValues };
      getDirty(_initialValues, initialValues.current, dirty).then(setDirty);
      if (validateOnChange && validateOnInit) {
        _validate(_initialValues).then();
      }
    }
    // eslint-disable-next-line
  }, [_initialValues]);

  useEffect(() => {
    onChange && onChange(values, errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, errors]);

  useEffect(() => {
    validateOnInit && _validate(values);
    setInit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (validateOnChange && isInit) {
      _validate(values).then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateSchema, validate]);

  const _setTouch = useCallback(
    (name: keyof T | string, touch: boolean, callback?: () => void) => {
      if (!touchedValues[name] && touch) {
        setTouchedValues(state => {
          state[name] = true;

          return _checkWatch([name]) ? { ...state } : state;
        });

        callback?.();
      }
    },
    [_checkWatch, touchedValues],
  );

  const _setValue = useCallback(
    (name: keyof T, value: ((state: T) => T[keyof T]) | T[keyof T]) =>
      setValues(state => {
        state[name] = lambdaFunc(value, state);

        const newState = _checkWatch([name]) ? { ...state } : state;

        validateOnChange && _validate(newState);
        getDirty(newState, initialValues.current, dirty).then(setDirty);

        return newState;
      }),
    [_validate, dirty, _checkWatch, validateOnChange],
  );

  const onSetValues: IForm<T>["onSetValues"] = useCallback(
    newValues => {
      setValues(newValues);
      _validate(newValues).then();
      getDirty(newValues, initialValues.current, dirty).then(setDirty);
    },
    [_validate, dirty],
  );

  const fieldNames = useMemo(() => {
    const obj: Record<keyof T, string> = {} as Record<keyof T, string>;

    Object.keys(initialValues.current).forEach(key => {
      obj[key as keyof T] = key;
    });

    return obj;
  }, []);

  const handleClearForm: IForm<T>["handleClearForm"] = useCallback(data => {
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

  const setFieldValue: IForm<T>["setFieldValue"] = useCallback(
    (name, value, touch) => {
      _setValue(name, value);
      _setTouch(name, !!touch);
    },
    [_setValue, _setTouch],
  );

  const handleBlur: IForm<T>["handleBlur"] = useCallback(
    event => {
      _setTouch(event.target.name, true, () => {
        validateOnChange && _validate(values);
      });
    },
    [_setTouch, _validate, validateOnChange, values],
  );

  const setFieldBlur: IForm<T>["setFieldBlur"] = useCallback(
    name => {
      _setTouch(name, true, () => {
        validateOnChange && _validate(values);
      });
    },
    [_setTouch, _validate, validateOnChange, values],
  );

  const valid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const validateForm = useCallback(async () => {
    const errors = await _validate(values);

    const keys = Object.keys(errors);

    keys.forEach(key => {
      _setTouch(key, true);
    });

    return Promise.resolve({
      count: keys.length,
      errors,
      hasErrors: keys.length > 0,
    });
  }, [_setTouch, _validate, values]);

  const form = useMemo(
    () => ({
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
      handleClearForm,
      validateForm,
    }),
    [
      dirty,
      errors,
      fieldNames,
      handleBlur,
      handleClearForm,
      onSetValues,
      setFieldBlur,
      setFieldValue,
      touchedValues,
      valid,
      validateForm,
      values,
    ],
  );

  const handleSubmit: IForm<T>["handleSubmit"] = useCallback(
    (params?: any) => {
      if (!params?.withoutValidate) {
        _validate(values)
          .then(e => {
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

                  return { ...acc, ...obj };
                }

                return { ...acc, [el]: true };
              }, {}),
            );

            Object.keys({ ...e }).length === 0 &&
              onSubmit?.({ ...values }, { ...form, handleSubmit });
          })
          .catch();
      } else {
        onSubmit?.({ ...values }, { ...form, handleSubmit });
      }
    },
    [_validate, form, onSubmit, values],
  );

  return { ...form, handleSubmit };
};

interface IValidateCallback<T> {
  (values: T): Partial<Record<keyof T | string, string>>;
}

type IValidateSchema<T> = ObjectSchema<
  Shape<object | undefined, Partial<Record<keyof T, any>>>,
  Object
>;

type FormObChangeCallback<T> = (
  values: T,
  errors: Partial<Record<keyof T | string, string>>,
) => void;

type LambdaValue<T> = ((state: T) => T[keyof T]) | T[keyof T];

interface IUseForm<T> {
  initialValues: T;
  onChange?: FormObChangeCallback<T>;
  onSubmit?: (values: T, form: IForm<T>) => void;
  validate?: IValidateCallback<T>;
  validateSchema?: IValidateSchema<T>;
  validateOnInit?: boolean;
  validateOnChange?: boolean;
  enableReinitialize?: boolean;
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
    value: LambdaValue<T>,
    touch?: boolean,
  ) => void;
  setFieldBlur: (name: keyof T | string) => void;
  handleSubmit: (params: { withoutValidate?: boolean } | unknown) => void;
  handleClearForm: (values: T | void) => void;
  validateForm: () => Promise<{
    hasErrors: boolean;
    count: number;
    errors: Partial<Record<keyof T | string, string>>;
  }>;
}
