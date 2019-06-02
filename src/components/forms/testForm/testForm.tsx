import * as React from "react";
import "./styles.scss";
import {FormikForm} from "../formikForm/formikForm";
import {FormikActions} from "formik";
import {testFormValidationSchema} from "./testFormValidationScema";
import {TextField} from "../../fields/textField/textField";
import {MultiSelectField} from "../../fields/multiSelectField/multiSelectField";

export interface IMyFormValues {
  firstName: string;
  lastName: string;
  email: string;
  items: string[];
}

/*tslint:disable*/
export class TestForm extends React.Component {
  private submit = (values: IMyFormValues, {setSubmitting}: FormikActions<IMyFormValues>): void => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  public render(): JSX.Element {
    return (
      <div className={"container"}>
        <p>Test Form</p>
        <FormikForm
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            items: [],
          }}
          validationSchema={testFormValidationSchema}
          onSubmit={this.submit}
        >
          <TextField name={"firstName"} placeholder={"Имя"}/>
          <TextField name={"lastName"} placeholder={"Фамилия"}/>
          <TextField name={"email"} placeholder={"Email"}/>
          <MultiSelectField name={"items"} options={[{id: "1", name: "1"}, {id: "2", name: "2"}, {id: "3", name: "3"}]}/>

          <button type="submit">Submit</button>
        </FormikForm>
      </div>
    );
  }
}
