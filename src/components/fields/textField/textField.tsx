import React, {Component} from "react";
import {Field, FieldProps} from "formik";

interface IProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name?: string;
  placeholder: string;
}

interface IState {
}

export class TextField extends Component<IProps, IState> {
  render(): JSX.Element {
    const {name} = this.props;
    const customInputComponent = ({field, form: {touched, errors}, ...props}: FieldProps): JSX.Element => (
      <div>
        <input type="text" {...field} {...props} {...this.props} />
        {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
      </div>
    );

    return (
      <>
        <Field name={name} render={customInputComponent}/>
      </>
    );
  }
}
