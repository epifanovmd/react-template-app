import React, { FC, useCallback, useState } from "react";
import styled from "styled-components";
import { object, string } from "yup";
import { Button, Input } from "../ui";
import { useForm } from "../../common";

export interface IRegistrationForm {
  firstName: string;
  lastName: string;
}

const initialValues: IRegistrationForm = {
  firstName: "",
  lastName: "",
};
const validateSchema = object().shape({
  firstName: string().required("Имя явялется обязательным полем"),
  lastName: string().required("Фамилия явялется обязательным полем"),
});

export const Registration: FC = () => {
  const [result, changeResult] = useState({});

  const onSubmit = useCallback((values: IRegistrationForm) => {
    console.log("values", values);
    changeResult({ values });
  }, []);

  const form = useForm(
    {
      initialValues,
      validateSchema,
      onSubmit,
    },
    [],
  );

  const {
    values,
    errors,
    handleBlur,
    touchedValues,
    fieldNames,
    setFieldValue,
    handleSubmit,
  } = form;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name as keyof IRegistrationForm;
      const value = event.target.value;

      setFieldValue(name, value);
    },
    [setFieldValue],
  );

  return (
    <Container>
      <RegistrationForm>
        <TabName>{"Форма"}</TabName>

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

        <Actions>
          <ActionForm onClick={handleSubmit}>{"Submit"}</ActionForm>
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
const TabName = styled.div`
  margin-bottom: 10px;
  text-align: center;
  font-weight: 600;
`;

const ActionForm = styled(Button)`
  width: 100%;
  height: 48px;
`;
