import { IForm } from "Common/hooks/useForm";
import { Button } from "Components/controls/button/button";
import { Input } from "Components/controls/Input";
import { ISelectItem, Select } from "Components/controls/select/select";
import React, { FC, Fragment } from "react";

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
    fieldsHelper.append("job", [
      { place: "", experience: "", position: { label: "", key: "" } },
    ]);

  const onSetPosition = (index: number) => (value: ISelectItem) =>
    fieldsHelper.setFieldValue("job", "position", value, index);

  return (
    <>
      <div>{errors.job}</div>
      {fieldsIterate(
        "job",
        ({ fieldNames, fieldsHelper, value, index, error, touched }) => (
          <Fragment key={index}>
            <Input
              label={"Место работы"}
              placeholder={"Место работы"}
              defaultValue={value.place}
              onChange={fieldsHelper.handleChange}
              name={fieldNames.place}
              onBlur={handleBlur}
              touch={touched.place}
              error={error.place}
            />

            <Input
              label={"Имя"}
              placeholder={"Имя"}
              defaultValue={value.experience}
              onChange={fieldsHelper.handleChange}
              name={fieldNames.experience}
              onBlur={handleBlur}
              touch={touched.experience}
              error={error.experience}
            />

            <Select
              name={fieldNames.position}
              items={positionItems}
              value={value.position}
              label={"Пол"}
              placeholder={"Выберете пол"}
              onChange={onSetPosition(index)}
              touch={touched.position}
              error={error.position}
            />
          </Fragment>
        ),
      )}

      <div>
        <Button onClick={addJob}>Добавить место работы</Button>
      </div>
    </>
  );
};
