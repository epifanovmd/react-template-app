import { Checkbox } from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox";
import {
  AntWrapper,
  IAntWrapperProps,
} from "Components/controls/antWrapperComponent";
import React, { FC, memo } from "react";

interface IProps
  extends Omit<CheckboxGroupProps, "onChange">,
    IAntWrapperProps {
  options: { label: string; value: any }[];
  onChange?: (event: React.ChangeEvent<any>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
}

export const CustomCheckboxGroup: FC<IProps> = memo(
  ({ onChange, onBlur, options, name, value, ...rest }) => {
    const handleChange: CheckboxGroupProps["onChange"] = _value => {
      onChange &&
        (onChange as any)({
          target: {
            value: _value,
            name,
          },
        });
      onBlur &&
        (onBlur as any)({
          target: {
            value: true,
            name,
          },
        });
    };

    return (
      <AntWrapper
        {...rest}
        Component={Checkbox.Group}
        value={value}
        onChange={handleChange}
      >
        {options.map((item, index) => (
          <Checkbox key={index} value={item.value}>
            {item.value}
          </Checkbox>
        ))}
      </AntWrapper>
    );
  },
);
