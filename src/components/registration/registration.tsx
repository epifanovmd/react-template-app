import styled from "astroturf";
import { useForm } from "Common/hooks/useForm";
import { Button } from "Components/controls/button/button";
import { ISelectItem } from "Components/controls/select/select";
import { InfoForm } from "Components/registration/sections/infoForm";
import { JobForm } from "Components/registration/sections/jobForm";
import React, { FC, useCallback, useState } from "react";
import { array, object, string } from "yup";

export interface IRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  gender: ISelectItem;

  job: { place: string; experience: string; position: ISelectItem }[];
}

export interface IRegistrationFormMeta {
  steps: { name: string; num: number }[];
  step: number;
}

const initialValues: IRegistrationForm = {
  email: "",
  firstName: "",
  lastName: "",
  gender: { key: "", label: "" },

  job: [],
};

const initialMeta: IRegistrationFormMeta = {
  steps: [
    { name: "Основная информация", num: 1 },
    { name: "Места работы", num: 2 },
  ],
  step: 1,
};

const validateSchemes = [
  object().shape({
    email: string()
      .email("Неверный формат Email")
      .required("Email явялется обязательным"),
    firstName: string().required("Имя явялется обязательным"),
    lastName: string().required("Фамилия явялется обязательной"),
    gender: object().shape({
      label: string().required("Необходимо выбрать пол"),
      key: string().required("Необходимо выбрать пол"),
    }),
  }),
  object().shape({
    job: array(
      object().shape({
        place: string().required("Место работы явялется обязательным"),
        experience: string().required("Стаж явялется обязательным"),
        position: object().shape({
          label: string().required("Необходимо выбрать позицию"),
          key: string().required("Необходимо выбрать позицию"),
        }),
      }),
    ).min(1, "Заполните хотя бы одно место работы"),
  }),
];

export const Registration: FC = () => {
  const [validateSchema, setValidateSchema] = useState<any>(validateSchemes[0]);

  const onSubmit = useCallback((values, meta) => {
    console.log("values", values);
    console.log("meta", meta);
  }, []);

  const form = useForm(
    {
      initialValues,
      validateSchema,
      initialMeta,
      onSubmit,
    },
    ["gender", "job"],
  );

  const { validateForm, handleSubmit, meta, setMeta } = form;

  const onChangeStep = (value: number) => {
    setMeta("step", value);
    setValidateSchema(validateSchemes[value - 1]);
  };

  const onNextStep = async () => {
    const { hasErrors } = await validateForm();

    !hasErrors && onChangeStep(meta.step + 1);
  };
  const onPrevStep = () => onChangeStep(meta.step - 1);

  return (
    <>
      <div>
        <Button disabled={meta.step === 1} onClick={onPrevStep}>
          Назад
        </Button>
      </div>
      <div>{meta.steps[meta.step - 1].name}</div>

      {meta.step === 1 && <InfoForm {...form} />}

      {meta.step === 2 && <JobForm {...form} />}
      <form onSubmit={handleSubmit} />

      <Button onClick={meta.step === 2 ? handleSubmit : onNextStep}>
        {meta.step === 2 ? "Регистрация" : "Далее"}
      </Button>
    </>
  );
};

const RegistrationForm = styled;
