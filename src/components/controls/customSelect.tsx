import { Select } from "antd";
import { SelectProps } from "antd/es/select";
import {
  AntWrapper,
  IAntWrapperProps,
} from "Components/controls/antWrapperComponent";
import React, { FC, memo, useCallback } from "react";

interface IProps
  extends Omit<SelectProps, "onChange" | "onBlur">,
    IAntWrapperProps {
  options: { label: string; value: string | number }[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
}

export const CustomSelect: FC<IProps> = memo(
  ({ onChange, onBlur, options, name, value, ...rest }) => {
    const onChangeHandler: SelectProps["onChange"] = useCallback(
      value => {
        const func: any = onChange;

        func &&
          func({
            target: {
              value,
              name,
            },
          });
      },
      [onChange, name],
    );
    const onBlurHandler: SelectProps["onBlur"] = useCallback(
      value => {
        const func: any = onBlur;

        func &&
          func({
            target: {
              value,
              name,
            },
          });
      },
      [onBlur, name],
    );

    return (
      <AntWrapper
        {...rest}
        Component={Select}
        name={name}
        value={value}
        // @ts-ignore
        onBlur={onBlurHandler}
        // @ts-ignore
        onChange={onChangeHandler}
      >
        {options.map((item, index) => (
          <Select.Option key={index} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </AntWrapper>
    );
  },
);
