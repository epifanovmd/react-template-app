import React, {Component} from "react";
import {
  DatetimePicker,
  DatetimePickerTrigger,
  DatetimeRangePicker,
  DatetimeRangePickerTrigger,
  IDatetimePickerProps,
  IDatetimePickerTriggerProps,
  IDatetimeRangePickerProps,
  IDatetimeRangePickerTriggerProps
} from "rc-datetime-picker";
import "./styles.scss";

export class DatePicker extends Component<IDatetimePickerProps> {
  render(): JSX.Element {
    return (
      <DatetimePicker {...this.props}/>
    );
  }
}

export class DatePickerTrigger extends Component<IDatetimePickerTriggerProps> {
  render(): JSX.Element {
    return (
      <DatetimePickerTrigger {...this.props}>
        {this.props.children}
      </DatetimePickerTrigger>
    );
  }
}

export class DateRangePicker extends Component<IDatetimeRangePickerProps> {
  render(): JSX.Element {
    return (
      <DatetimeRangePicker {...this.props}/>
    );
  }
}

export class DateRangePickerTrigger extends Component<IDatetimeRangePickerTriggerProps> {
  render(): JSX.Element {
    return (
      <DatetimeRangePickerTrigger {...this.props}>
        {this.props.children}
      </DatetimeRangePickerTrigger>
    );
  }
}
