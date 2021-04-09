import styled from "astroturf";
import { IForm } from "Common/hooks/useForm";
import { Button } from "Components/controls/button/button";
import { Input } from "Components/controls/Input";
import { ISelectItem, Select } from "Components/controls/select/select";
import React, { ChangeEvent, FC, Fragment, useCallback } from "react";

import { IRegistrationForm, IRegistrationFormMeta } from "../registration";

interface IProps extends IForm<IRegistrationForm, IRegistrationFormMeta> {}

const positionItems = [
  { label: "IT сфера", key: "1" },
  { label: "Инжинер конструктор", key: "2" },
];

export const JobForm: FC<IProps> = ({
  handleBlur,
  fieldsIterate,
  fieldsHelper,
  errors,
}) => {
  const addJob = () =>
    fieldsHelper.append("job", {
      place: "",
      experience: "",
      position: { label: "", key: "" },
    });

  const onSetPosition = (index: number) => (value: ISelectItem) =>
    fieldsHelper.setFieldValue("job", "position", value, index);

  const handleChange = useCallback(
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      fieldsHelper.setFieldValue(
        "job",
        event.target.name as any,
        event.target.value,
        index,
      );
    },
    [fieldsHelper],
  );

  return (
    <>
      <Error>{errors.job}</Error>
      {fieldsIterate("job", ({ fieldNames, value, index, error, touched }) => (
        <Fragment key={index}>
          <Input
            label={"Место работы"}
            placeholder={"Место работы"}
            defaultValue={value.place}
            onChange={handleChange(index)}
            name={fieldNames.place}
            onBlur={handleBlur}
            touch={touched.place}
            error={error.place}
          />

          <Input
            label={"Стаж"}
            placeholder={"Стаж"}
            defaultValue={value.experience}
            onChange={handleChange(index)}
            name={fieldNames.experience}
            onBlur={handleBlur}
            touch={touched.experience}
            error={error.experience}
          />

          <Select
            name={fieldNames.position}
            items={positionItems}
            value={value.position}
            label={"Направление"}
            placeholder={"Выберете Направление"}
            onChange={onSetPosition(index)}
            touch={touched.position}
            error={error.position}
          />
        </Fragment>
      ))}

      <Actions>
        <StyledButton onClick={addJob}>Добавить</StyledButton>
      </Actions>
    </>
  );
};

const Actions = styled.div`
  display: flex;
`;
const StyledButton = styled(Button)`
  height: 32px;
  width: 100%;
`;
const Error = styled.div`
  display: flex;
  color: red;
  margin: 0 10px;
`;
