import { useForm } from "Common/hooks/useForm";
import { Button } from "Components/controls/button/button";
import { Input } from "Components/controls/Input";
import { Select } from "Components/controls/select/select";
import React, { FC, memo, useCallback } from "react";
import { array, object, string } from "yup";

// import EmailIcon from "../../icons/email.svg";

export const TestComponents: FC = memo(() => {
  const validateSchema = object().shape({
    inp: string().required("Поле 'inp' явялется обязательным"),
    select: object().required("Поле 'select' явялется обязательным"),
    inputs: array(
      object().shape({
        input: string().required("Поле 'inp' явялется обязательным"),
      }),
    ),
  });

  const {
    values,
    errors,
    touchedValues,
    fieldNames,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldBlur,
    fieldsIterate,
  } = useForm(
    {
      initialValues: {
        inp: "",
        select: undefined,
        inputs: [{ input: "" }, { input: "" }],
      },
      validateSchema,
      validateOnInit: true,
      onSubmit: vals => console.log("values", vals),
    },
    ["select"],
  );

  console.log("render");

  const onChangeSelect = useCallback(
    (value, name) => {
      setFieldValue(name, value);
    },
    [setFieldValue],
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        // icon={<EmailIcon />}
        label={"setFieldValue"}
        placeholder={"Email"}
        onChange={handleChange}
        name={fieldNames.inp}
        onBlur={handleBlur}
        touch={touchedValues.inp}
        error={errors.inp}
      />
      <Select
        name={"select"}
        onBlur={setFieldBlur}
        items={[
          {
            key: 1,
            label: "1",
          },
          {
            key: 2,
            label: "2",
          },
        ]}
        value={values.select}
        onChange={onChangeSelect}
        touch={touchedValues.select}
        error={errors.select}
      />

      {fieldsIterate("inputs", inputs => (
        <Input
          key={inputs.index}
          label={"inputs"}
          onChange={inputs.fieldsHelper.handleChange}
          name={inputs.fieldNames.input}
          onBlur={handleBlur}
          touch={inputs.touched.input}
          error={inputs.error.input}
        />
      ))}

      <Button onClick={handleSubmit as any}>Отправить</Button>
    </form>
  );
});
