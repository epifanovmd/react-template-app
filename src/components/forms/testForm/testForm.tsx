import * as React from "react";
import "./styles.scss";
import {FormikForm} from "../formikForm/formikForm";
import {FormikActions} from "formik";
import {testFormValidationSchema} from "./testFormValidationScema";
import {TextField} from "../../fields/textField/textField";
import {SelectField} from "../../fields/selectField/selectField";
import {RangeField} from "../../multiRangeField/rangeField";

export interface IMyFormValues {
  firstName: string;
  lastName: string;
  email: string;
  items: string[];
}

export class TestForm extends React.Component {
  public render(): JSX.Element {
    return (
      <div className={"container"}>
        <p>Test Form</p>
        <FormikForm
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            multiply_items: [],
            range: {},
            items: [],
          }}
          validationSchema={testFormValidationSchema}
          onSubmit={this.submit}
        >
          <TextField name={"firstName"} placeholder={"Имя"} />
          <TextField name={"lastName"} placeholder={"Фамилия"} />
          <TextField name={"email"} placeholder={"Email"} />
          <SelectField
            name={"multiply_items"}
            options={[{id: 1, name: "1"}, {id: 2, name: "2"}, {id: 3, name: "3"}]}
            multiply={true}
            selected={[1, 3]}
          />

          <RangeField
            name={"range"}
            thumbText={this.time}
            rightThumbText={this.time}
            outValue={this.time}
            maxValue={48}
            multiply={true}
          />

          <SelectField
            name={"items"}
            options={[{id: 1, name: "1"}, {id: 2, name: "2"}, {id: 3, name: "3"}]}
            selected={[3]}
          />
          <button type="submit">Submit</button>
        </FormikForm>
      </div>
    );
  }

  private submit = (values: IMyFormValues, {setSubmitting}: FormikActions<IMyFormValues>): void => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  private time = (time: number): string => {
    if (time % 2) {
      return `${Math.trunc(time / 2)}:30`;
    } else {
      return (time / 2 === 24) ? "23:59" : `${time / 2}:00`;
    }
  };
}
