import { Radio } from "antd";
import { RadioGroupProps } from "antd/es/radio";
import {
  AntWrapper,
  IAntWrapperProps,
} from "Components/controls/antWrapperComponent";
import React, { FC, memo } from "react";

interface IProps extends Omit<RadioGroupProps, "onChange">, IAntWrapperProps {
  options: { label: string; value: any }[];
  onChange?: (event: React.ChangeEvent<any>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
}

export const CustomRadioGroup: FC<IProps> = memo(
  ({ onChange, onBlur, options, name, value, ...rest }) => {
    const handleChange: RadioGroupProps["onChange"] = event => {
      onChange &&
        (onChange as any)({
          ...event,
          target: {
            ...event.target,
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
        Component={Radio.Group}
        value={value}
        onChange={handleChange}
      >
        {options.map((item, index) => (
          <Radio name={name} key={index} value={item.value}>
            {item.value}
          </Radio>
        ))}
      </AntWrapper>
    );
  },
);
