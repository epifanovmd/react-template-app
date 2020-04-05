import { DatePicker, Select } from "antd";
import { RangePickerProps } from "antd/es/date-picker/interface";
import { RangePickerValue } from "antd/lib/date-picker/interface";
import {
  AntWrapper,
  IAntWrapperProps,
} from "Components/controls/antWrapperComponent";
import moment from "moment";
import React, { FC, memo, useCallback } from "react";
const RangePicker = DatePicker.RangePicker;

interface IProps
  extends Omit<RangePickerProps, "onChange" | "onBlur" | "value">,
    IAntWrapperProps {
  value?: { from: string; to: string };
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const CustomRangePicker: FC<IProps> = memo(
  ({ onChange, onBlur, name, value, ...rest }) => {
    const onChangeHandler: (
      dates: RangePickerValue,
      dateStrings: [string, string],
    ) => void = useCallback(
      ({}, values) => {
        const func: any = onChange;

        func &&
          func({
            target: {
              value: {
                from: values[0] || "",
                to: values[1] || "",
              },
              name,
            },
          });
      },
      [onChange, name],
    );
    const onBlurHandler: (status: boolean) => void = useCallback(
      status => {
        const func: any = onBlur;

        !status &&
          func &&
          func({
            target: {
              value: true,
              name,
            },
          });
      },
      [onBlur, name],
    );

    return (
      <AntWrapper
        {...rest}
        Component={RangePicker}
        onChange={onChangeHandler}
        onOpenChange={onBlurHandler}
        value={
          value
            ? (value.from &&
                value.to && [moment(value.from), moment(value.to)]) ||
              undefined
            : undefined
        }
      />
    );
  },
);
