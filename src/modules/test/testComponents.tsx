import { Button } from "antd";
import { debounce } from "Common/debounce";
import { useForm } from "Common/useForm";
import { CustomRangePicker } from "Components/controls/customRangePicker";
import { SearchInput } from "Components/controls/searchInput";
import React, { FC, memo } from "react";
import { array, object, string } from "yup";

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
        inputs: [
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
          { input: "" },
        ],
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
      <SearchInput
        title={"setFieldValue"}
        // value={values.inp}
        onChange={onSetValue}
        name={fieldNames.inp}
        onBlur={handleBlur}
        touch={touchedValues.inp}
        error={errors.inp}
      />
      <SearchInput
        title={"handleChange"}
        // value={values.inp1}
        onChange={handleChange}
        name={fieldNames.inp1}
        onBlur={handleBlur}
        touch={touchedValues.inp1}
        error={errors.inp1}
      />

      {fieldsIterate("inputs", inputs => (
        <SearchInput
          title={"inputs"}
          onChange={inputs.fieldsHelper.handleChange}
          name={inputs.fieldNames.input}
          onBlur={handleBlur}
          touch={inputs.touched.input}
          error={inputs.error.input}
        />
      ))}

      <Button htmlType={"submit"}>Отправить</Button>
    </form>
  );
});
