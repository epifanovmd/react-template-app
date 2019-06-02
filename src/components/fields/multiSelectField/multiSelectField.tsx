import React, {Component} from "react";
import {FieldArray} from "formik";
import {IItem, MultiSelect} from "../../multiSelect/multiSelect";

interface IProps {
  name: string;
  options: IItem[];
}

interface IState {
}

export class MultiSelectField extends Component<IProps, IState> {
  render(): JSX.Element {
    const {name, options} = this.props;
    const customMultiSelectComponent = (arrayHelpers: any): JSX.Element => (
      <div>
        <MultiSelect
          name={name}
          onChange={this.setSelected(arrayHelpers)}
          list={options}
        />
      </div>
    );

    return (
      <>
        <FieldArray
          name={name}
          render={customMultiSelectComponent}
        />
      </>
    );
  }

  private setSelected = (arrayHelpers: any): (items: string[]) => void => (items: string[]): void => {
    const {form: {values}, push, remove} = arrayHelpers;
    const {name} = this.props;
    values[name].filter((item: string) => {
      return !items.some((someItem: string) => someItem === item);
    }).map((removeElement: string) => remove(values[name].indexOf(removeElement)));

    items.filter(item =>
      !values[name].some((someItem: string) => someItem === item))
      .map((pushElement: string) => push(pushElement));
  };
}
