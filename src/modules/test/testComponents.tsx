import { Button } from "antd";
import { useForm } from "Common/useForm";
import { CustomRangePicker } from "Components/controls/customRangePicker";
import { SearchInput } from "Components/controls/searchInput";
import React, { FC, memo } from "react";
import { object, string } from "yup";

export const TestComponents: FC = memo(() => {
  console.log(1);

  const validateSchema = object().shape({
    inp: string().required("Поле 'inp' явялется обязательным"),
    range: object().shape({
      from: string().required("Поле 'from' явялется обязательным"),
      to: string().required("Поле 'to' явялется обязательным"),
    }),
  });

  const {
    values,
    errors,
    touchedValues,
    fieldNames,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues: {
      inp: "",
      range: {
        from: "",
        to: "",
      },
    },
    validateSchema,
    onSubmit: vals => console.log("values", vals),
  });

  return (
    <form onSubmit={handleSubmit}>
      <SearchInput
        defaultValue={values.inp}
        // value={values.inp}
        onChange={handleChange}
        name={fieldNames.inp}
        onBlur={handleBlur}
        touch={touchedValues.inp}
        error={errors.inp}
      />
      <CustomRangePicker
        name={fieldNames.range}
        value={values.range}
        touch={touchedValues.range}
        error={errors.range}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Button htmlType={"submit"}>Отправить</Button>
    </form>
  );
});
