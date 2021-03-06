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
      .required("Email явялется обязательным полем"),
    firstName: string().required("Имя явялется обязательным полем"),
    lastName: string().required("Фамилия явялется обязательным полем"),
    gender: object().shape({
      label: string().required("Пол явялется обязательным полем"),
      key: string().required("Пол явялется обязательным полем"),
    }),
  }),
  object().shape({
    job: array(
      object().shape({
        place: string().required("Место работы явялется обязательным полем"),
        experience: string().required("Стаж явялется обязательным полемм"),
        position: object().shape({
          label: string().required("Позиция явялется обязательным полем"),
          key: string().required("Позиция явялется обязательным полем"),
        }),
      }),
    ).min(1, "Необходимо заполнить хотя бы одно место работы"),
  }),
];

export const Registration: FC = () => {
  const [validateSchema, setValidateSchema] = useState<any>(validateSchemes[0]);
  const [result, changeResult] = useState({});

  const onSubmit = useCallback((values, meta) => {
    console.log("values", values);
    console.log("meta", meta);
    changeResult({ values, meta });
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
    <Container>
      <RegistrationForm>
        <Actions>
          <BackButton disabled={meta.step === 1} onClick={onPrevStep}>
            Назад
          </BackButton>
        </Actions>
        <TabName>{meta.steps[meta.step - 1].name}</TabName>

        {meta.step === 1 && <InfoForm {...form} />}

        {meta.step === 2 && <JobForm {...form} />}
        <form onSubmit={handleSubmit} />

        <Actions>
          <ActionForm onClick={meta.step === 2 ? handleSubmit : onNextStep}>
            {meta.step === 2 ? "Регистрация" : "Далее"}
          </ActionForm>
        </Actions>
      </RegistrationForm>

      <SubmitResult>{result && JSON.stringify(result, null, 2)}</SubmitResult>
    </Container>
  );
};

const Container = styled.div`
  margin: 100px auto 0 auto;
  display: flex;
  align-items: stretch;
`;
const SubmitResult = styled.pre`
  position: relative;
  display: flex;
  width: 500px;
  margin-left: 80px;
  padding: 20px;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

  &:after {
    content: "";
    position: absolute;
    left: -50px;
    top: 50%;
    height: 5px;
    width: 20px;
    border: 2px solid black;
    border-left: none;
    border-right: none;
    transform: translateY(-100%);
  }
`;

const RegistrationForm = styled.div`
  max-width: 400px;
  padding: 20px;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;

const Actions = styled.div`
  display: flex;
  padding: 10px 0 20px 0;
`;
const BackButton = styled(Button)``;
const TabName = styled.div`
  margin-bottom: 10px;
  text-align: center;
  font-weight: 600;
`;

const ActionForm = styled(Button)`
  width: 100%;
  height: 48px;
`;
