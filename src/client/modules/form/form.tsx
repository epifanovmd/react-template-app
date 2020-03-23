import React, { FC, useCallback } from "react";
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
  const validateSchema = object().shape({
    input: string().required("Поле 'input' явялется обязательным"),
    select: array(string()).required("Поле 'select' явялется обязательным"),
    checkBox: array(number()).required("Поле 'checkBox' явялется обязательным"),
    radio: number().required("Поле 'radio' явялется обязательным"),
    range: object().shape({
      from: string().required("Поле 'from' явялется обязательным"),
      to: string().required("Поле 'to' явялется обязательным"),
    }),
    textArea: string().required("Поле 'textArea' явялется обязательным"),
    ranges: array(
      object().shape({
        range: object().shape({
          from: string().required("Поле 'from' явялется обязательным"),
          to: string().required("Поле 'to' явялется обязательным"),
        }),
      }),
    ),
    checkboxes: array(
      object().shape({
        checkbox: array(number()).required(
          "Поле 'select' явялется обязательным",
        ),
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
      ranges: [
        {
          range: { from: "", to: "" },
        },
      ],
      checkboxes: [
        {
          checkbox: [],
        },
      ],
    },
    onSubmit: (_values) => {
      console.log("Values", _values);
    },
    validateOnInit: true,
    validateSchema,
  });

  const onRemoveRanges = useCallback(
    (index: number) => () => {
      fieldsHelper.remove("ranges", index);
    },
    [fieldsHelper.remove],
  );

  const onRemoveCheckboxes = useCallback(
    (index: number) => () => {
      fieldsHelper.remove("checkboxes", index);
    },
    [fieldsHelper.remove],
  );

  const onAppendRanges = useCallback(() => {
    fieldsHelper.append("ranges", [{ range: { from: "", to: "" } }]);
  }, [fieldsHelper.remove]);

  const onAppendCheckboxes = useCallback(() => {
    fieldsHelper.append("checkboxes", [{ checkbox: [] }]);
  }, [fieldsHelper.remove]);

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
      {fieldsIterate("ranges", (ranges) => {
        return (
          <div key={ranges.index}>
            <CustomRangePicker
              name={ranges.fieldsName.range}
              value={ranges.value.range}
              touch={ranges.touched.range}
              error={ranges.error.range}
              onChange={ranges.fieldsHelper.handleChange}
              onBlur={handleBlur}
            />
            <Button onClick={onRemoveRanges(ranges.index)}>Удалить</Button>
          </div>
        );
      })}
      <Button onClick={onAppendRanges}>Добавть период</Button>
      {fieldsIterate("checkboxes", (checkboxes) => {
        return (
          <div key={checkboxes.index}>
            <CustomCheckboxGroup
              name={checkboxes.fieldsName.checkbox}
              value={checkboxes.value.checkbox}
              touch={checkboxes.touched.checkbox}
              error={checkboxes.error.checkbox}
              onChange={checkboxes.fieldsHelper.handleChange}
              onBlur={handleBlur}
              options={[
                { value: 1, label: "1" },
                { value: 2, label: "2" },
              ]}
            />
            <Button onClick={onRemoveCheckboxes(checkboxes.index)}>
              Удалить
            </Button>
          </div>
        );
      })}
      <Button onClick={onAppendCheckboxes}>Добавть чекбоксы</Button>
      <Button htmlType={"submit"}>Отправить</Button>
    </form>
  );
};

export default From;
