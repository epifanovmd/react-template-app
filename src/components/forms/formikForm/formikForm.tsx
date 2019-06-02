import React, {Component} from "react";
import {Form, Formik, FormikActions} from "formik";

interface IFormikFormProps<T extends object> {
  initialValues: T;
  onSubmit: (values: T, formikActions: FormikActions<T>) => void;
  validationSchema: any;
}
interface IEmpty {
}

export class FormikForm<T extends object> extends Component<IFormikFormProps<T>, IEmpty> {
  public render(): JSX.Element {
    const {children, onSubmit, initialValues, validationSchema} = this.props;
  const form = (): JSX.Element => (
      <Form>
        {children}
      </Form>
    );

    return (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          render={form}
        />
    );
  }
}
