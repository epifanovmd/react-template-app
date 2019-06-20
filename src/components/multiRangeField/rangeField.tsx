import React, {Component} from "react";
import {Field, FieldProps} from "formik";
import {IInterval, IRangeProps, Range} from "../range/range";

interface IProps extends IRangeProps {
  name: string;
}

interface IState {
}

export class RangeField extends Component<IProps, IState> {
  render(): JSX.Element {
    const {name} = this.props;
    const customMultiRangeComponent = ({field, form: {setFieldValue}}: FieldProps): JSX.Element => (
        <Range {...this.props} onChanged={this.setValues(field.name, setFieldValue)}/>
    );

    return (
      <>
        <Field name={name} render={customMultiRangeComponent} />
      </>
    );
  }

  private setValues = (name: string, setFieldValue: (field: string, value: any) => void): (values: IInterval | string) => void =>
    (values: IInterval | string): void => {
      setFieldValue(name, values);
    };
}
