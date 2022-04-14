import React, { ChangeEvent, FC, useCallback } from "react";

import EmailIcon from "../../../icons/email.svg";

import { IRegistrationForm, IRegistrationFormMeta } from "../registration";
import { IForm } from "../../../common";
import { ISelectItem, Select, Input } from "../../ui";

interface IProps extends IForm<IRegistrationForm, IRegistrationFormMeta> {}

const genderItems = [
  { label: "Мужчина", key: "male", description: "Мужской пол" },
  { label: "Женщина", key: "female", description: "Женский пол" },
];

export const InfoForm: FC<IProps> = ({
  values,
  errors,
  touchedValues,
  handleBlur,
  fieldNames,
  setFieldValue,
}) => {
  const onChangeGender = (value: ISelectItem) => {
    setFieldValue("gender", value);
  };

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFieldValue(event.target.name as any, event.target.value);
    },
    [setFieldValue],
  );

  return (
    <>
      <Input
        label={"Имя"}
        placeholder={"Имя"}
        defaultValue={values.firstName}
        onChange={handleChange}
        name={fieldNames.firstName}
        onBlur={handleBlur}
        touch={touchedValues.firstName}
        error={errors.firstName}
      />

      <Input
        label={"Фамилия"}
        placeholder={"Фамилия"}
        defaultValue={values.lastName}
        onChange={handleChange}
        name={fieldNames.lastName}
        onBlur={handleBlur}
        touch={touchedValues.lastName}
        error={errors.lastName}
      />

      <Input
        icon={<EmailIcon />}
        label={"Email"}
        placeholder={"Email"}
        defaultValue={values.email}
        onChange={handleChange}
        name={fieldNames.email}
        onBlur={handleBlur}
        touch={touchedValues.email}
        error={errors.email}
      />

      <Select
        name={fieldNames.gender}
        items={genderItems}
        value={values.gender}
        label={"Пол"}
        placeholder={"Выберете пол"}
        onChange={onChangeGender}
        touch={touchedValues.gender}
        error={errors.gender}
      />
    </>
  );
};
