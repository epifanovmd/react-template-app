declare module "rc-datetime-picker" {
  import {Component} from "react";
  import {Moment} from "moment";

  export interface IDatetimePickerProps {
    moment: Moment;
    onChange: (datetime: Moment) => void;
    className?: string;
    isOpen?: boolean;
    showCalendarPicker?: boolean;
    showTimePicker?: boolean;
    splitPanel?: boolean;
    shortcuts?: { name: any };
    maxDate?: Moment;
    minDate?: Moment;
    weeks?: string[];
    months?: string[];
    dayFormat?: string;
    minPanel?: string;
  }

  export interface IDatetimePickerTriggerProps {
    moment?: Moment;
    onChange?: (datetime: Moment) => void;
    className?: string;
    showCalendarPicker?: boolean;
    showTimePicker?: boolean;
    splitPanel?: boolean;
    shortcuts?: { name: any };
    maxDate?: Moment;
    minDate?: Moment;
    weeks?: string[];
    months?: string[];
    dayFormat?: string;
    appendToBody?: boolean;
    closeOnSelectDay?: boolean;
    disabled?: boolean;
    minPanel?: string;
  }

  export interface IDatetimeRangePickerProps {
    moment: Moment;
    onChange: (datetime: Moment) => void;
    className?: string;
    showCalendarPicker?: boolean;
    showTimePicker?: boolean;
    splitPanel?: boolean;
    shortcuts?: { name: any };
    maxDate?: Moment;
    minDate?: Moment;
    weeks?: string[];
    months?: string[];
    dayFormat?: string;
    format?: string;
    showCustomButton?: boolean;
    customButtonText?: string;
    customRange?: { start: Moment, end: Moment };
    confirmButtonText?: string;
    startDateText?: string;
    endDateText?: string;
    dateLimit?: { name: any };
    minPanel?: string;
  }

  export interface IDatetimeRangePickerTriggerProps {
    moment: Moment;
    onChange: (datetime: Moment) => void;
    className?: string;
    showCalendarPicker?: boolean;
    showTimePicker?: boolean;
    splitPanel?: boolean;
    shortcuts?: { name: any };
    maxDate?: Moment;
    minDate?: Moment;
    weeks?: string[];
    months?: string[];
    dayFormat?: string;
    format?: string;
    showCustomButton?: boolean;
    customButtonText?: string;
    customRange?: { start: Moment, end: Moment };
    confirmButtonText?: string;
    startDateText?: string;
    endDateText?: string;
    dateLimit?: { name: any };
    appendToBody?: boolean;
    disabled?: boolean;
    minPanel?: string;
  }

  export class DatetimePicker extends Component<IDatetimePickerProps> {
  }

  export class DatetimePickerTrigger extends Component<IDatetimePickerTriggerProps> {
  }

  export class DatetimeRangePicker extends Component<IDatetimeRangePickerProps> {
  }

  export class DatetimeRangePickerTrigger extends Component<IDatetimeRangePickerTriggerProps> {
  }
}
