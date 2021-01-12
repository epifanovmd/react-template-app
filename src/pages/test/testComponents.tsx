import { useForm } from "Common/hooks/useForm";
import { Button } from "Components/controls/button/button";
import { Input } from "Components/controls/Input";
import React, { FC, memo } from "react";
import { array, object, string } from "yup";

import EmailIcon from "../../icons/email.svg";

export const TestComponents: FC = memo(() => {
  const validateSchema = object().shape({
    inp: string().required("Поле 'inp' явялется обязательным"),
    inp1: string().required("Поле 'inp1' явялется обязательным"),
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
    fieldsIterate,
  } = useForm(
    {
      initialValues: {
        inp: "",
        inp1: "",
        inputs: [{ input: "" }, { input: "" }],
      },
      validateSchema,
      validateOnInit: true,
      onSubmit: vals => console.log("values", vals),
    },
    ["inp", "inputs"],
  );

  console.log("render");

  const onSetValue = ({ target }: any) => {
    setFieldValue("inp", target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        icon={<EmailIcon />}
        label={"setFieldValue"}
        // value={values.inp}
        placeholder={"Email"}
        onChange={onSetValue}
        name={fieldNames.inp}
        onBlur={handleBlur}
        touch={touchedValues.inp}
        error={errors.inp}
      />
      <Input
        label={"handleChange"}
        // value={values.inp1}
        onChange={handleChange}
        name={fieldNames.inp1}
        onBlur={handleBlur}
        touch={touchedValues.inp1}
        error={errors.inp1}
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
