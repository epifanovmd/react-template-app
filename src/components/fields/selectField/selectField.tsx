import React, {Component} from "react";
import {Field, FieldProps} from "formik";
import {ISelectProps, Select} from "../../controls/select/select";

interface IProps extends ISelectProps {
  name: string;
}

interface IState {
}

export class SelectField extends Component<IProps, IState> {
  render(): JSX.Element {
    const {name, options, ...rest} = this.props;
    const customSelectComponent = ({field, form: {setFieldValue}}: FieldProps): JSX.Element => (
      <div>
        <Select
          onChange={this.setSelected(field.name, setFieldValue)}
          options={options}
          {...rest}
        />
      </div>
    );

    return (
      <>
        <Field
          name={name}
          render={customSelectComponent}
        />
      </>
    );
  }

  private setSelected = (name: string, setFieldValue: (field: string, value: any) => void): (items: number[] | number) => void => {
    return (items: number[] | number): void => {
      setFieldValue(name, items);
    };
  };
}
