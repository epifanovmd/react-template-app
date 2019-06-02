import React, {Component} from "react";
import {Field, FieldProps} from "formik";

interface IProps {
  name: string;
  placeholder: string;
}

interface IState {
}

export class TextField extends Component<IProps, IState> {
  render(): JSX.Element {
    const {name, placeholder} = this.props;
    const customInputComponent = ({field, form: {touched, errors}, ...props}: FieldProps): JSX.Element => (
      <div>
        <input type="text" {...field} {...props} placeholder={placeholder} />
        {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
      </div>
    );

    return (
      <>
        <Field name={name} placeholder={placeholder} render={customInputComponent}/>
      </>
    );
  }
}
