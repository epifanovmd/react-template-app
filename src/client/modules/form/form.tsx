import React, { FC } from "react";
import { useForm } from "Common/useForm";
import { CustomInput } from "Components/controls/customInput";
import { CustomSelect } from "Components/controls/customSelect";
import { CustomCheckboxGroup } from "Components/controls/customCheckbox";
import { CustomRangePicker } from "Components/controls/customRangePicker";
import { CustomTextArea } from "Components/controls/customTextArea";
import { Button } from "antd";
import { CustomRadioGroup } from "Components/controls/customRadio";
import { array, number, object, string } from "yup";

const From: FC = () => {
  const validateSchema: any = object().shape({
    input: string().required("Поле явялется обязательным"),
    select: array(string()).required("Поле явялется обязательным"),
    checkBox: array(number()).required("Поле явялется обязательным"),
    radio: number().required("Поле явялется обязательным"),
    range: object().shape({
      from: string().required("Поле явялется обязательным"),
      to: string().required("Поле явялется обязательным"),
    }),
    textArea: string().required("Поле явялется обязательным"),
    selectes: array(
      object().shape({
        select: number().required("Поле явялется обязательным"),
      }),
    ),
  });
  const {
    fieldNames,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touchedValues,
    fieldsIterate,
    fieldsHelper,
  } = useForm({
    initialValues: {
      input: "",
      select: ["2", "1"],
      checkBox: [1],
      radio: 2,
      range: { from: "", to: "" },
      textArea: "",
      selectes: [
        {
          select: undefined,
        },
      ],
    },
    onSubmit: (_values) => {
      console.log("Values", _values);
    },
    validateOnInit: true,
    validateSchema,
  });

  console.log("errors", errors);

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        name={fieldNames.input}
        value={values.input}
        touch={touchedValues.input}
        error={errors.input}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <CustomSelect
        name={fieldNames.select}
        value={values.select}
        touch={touchedValues.select}
        error={errors.select}
        onChange={handleChange}
        onBlur={handleBlur}
        options={[
          { value: 1, label: "1" },
          { value: 2, label: "2" },
          { value: 3, label: "3" },
        ]}
      />
      <CustomCheckboxGroup
        name={fieldNames.checkBox}
        value={values.checkBox}
        touch={touchedValues.checkBox}
        error={errors.checkBox}
        onChange={handleChange}
        onBlur={handleBlur}
        options={[
          { value: 1, label: "1" },
          { value: 2, label: "2" },
        ]}
      />

      <CustomRadioGroup
        name={fieldNames.radio}
        value={values.radio}
        touch={touchedValues.radio}
        error={errors.radio}
        onChange={handleChange}
        onBlur={handleBlur}
        options={[
          { value: 1, label: "1" },
          { value: 2, label: "2" },
        ]}
      />
      <CustomRangePicker
        name={fieldNames.range}
        value={values.range}
        touch={touchedValues.range}
        error={errors.range}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <CustomTextArea
        name={fieldNames.textArea}
        value={values.textArea}
        touch={touchedValues.textArea}
        error={errors.textArea}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {fieldsIterate("selectes", (selectes) => {
        return (
          <div key={selectes.index}>
            <CustomSelect
              name={selectes.fieldsName.select}
              value={selectes.value.select}
              touch={selectes.touched.select}
              error={selectes.error.select}
              onChange={selectes.fieldsHelper.handleChange}
              onBlur={handleBlur}
              options={[
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" },
              ]}
            />
          </div>
        );
      })}
      <Button htmlType={"submit"}>Отправить</Button>
    </form>
  );
};

export default From;
