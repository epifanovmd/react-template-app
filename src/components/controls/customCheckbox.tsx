import { Checkbox } from "antd";
import {
  CheckboxChangeEvent,
  CheckboxGroupProps,
  CheckboxProps,
} from "antd/es/checkbox";
import { RadioChangeEvent } from "antd/es/radio";
import React, { FC, memo, useCallback } from "react";
import styled, { css } from "styled-components";

interface IProps extends Omit<CheckboxProps, "onChange"> {
  error?: string;
  touch?: boolean;
  title?: string;
  name: string;
  positionTitle?: "top" | "left";
  requiredIcon?: boolean;
  minWidthTitle?: string;
  description?: string;
  maxWidth?: string;
  options: { label: string; value: any }[];
  onChange?: (event: React.ChangeEvent<any>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
}

const Wrap = styled.div<{ maxWidth?: string }>`
  display: flex;
  flex-flow: column;
  ${({ maxWidth }) =>
    maxWidth
      ? css`
          flex-grow: 0;
          flex-basis: auto;
        `
      : css`
          flex-grow: 1;
          flex-basis: 0;
        `};
  padding: 8px;
  position: relative;
`;

const Required = styled.div`
  color: red;
  display: flex;
  font-size: 14px;
  padding-right: 3px;
  align-items: center;
`;

const Label = styled.label<{ minWidthTitle?: string; positionTitle?: string }>`
  ${({ positionTitle }) =>
    positionTitle === "left" ? "padding-top: 5px;" : ""};
  display: flex;
  white-space: nowrap;
  ${({ minWidthTitle }) =>
    minWidthTitle ? `min-width: ${minWidthTitle}` : ""};
  padding-right: 10px;
  justify-content: ${({ positionTitle }) =>
    positionTitle === "left" ? "flex-end" : "flex-start"};
  align-items: flex-start;
`;

const Error = styled.div`
  color: red;
`;

const Description = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #8c8c8c;
`;

const ControlWrap = styled.div<{ maxWidth?: string }>`
  ${({ maxWidth }) => (maxWidth ? `max-width : ${maxWidth}` : "")};
  display: flex;
  flex-flow: column;
  flex-grow: 1;
`;

const TitleWrap = styled.div<{ positionTitle?: "top" | "left" }>`
  ${({ positionTitle }) => (positionTitle === "left" ? "display: flex;" : "")}
`;

export const CustomCheckboxGroup: FC<IProps> = memo(props => {
  const {
    title,
    touch,
    error,
    name,
    positionTitle,
    requiredIcon,
    minWidthTitle,
    description,
    maxWidth,
    onChange,
    onBlur,
    options,
    value,
    ...rest
  } = props;

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
    <Wrap maxWidth={maxWidth}>
      <TitleWrap positionTitle={positionTitle}>
        {title && (
          <Label
            positionTitle={positionTitle}
            minWidthTitle={minWidthTitle}
            htmlFor={name}
          >
            {requiredIcon && <Required>*</Required>}
            {title}
          </Label>
        )}
        <ControlWrap maxWidth={maxWidth}>
          <Checkbox.Group value={value} onChange={handleChange}>
            {options.map((item, index) => (
              <Checkbox {...rest} key={index} value={item.value}>
                {item.value}
              </Checkbox>
            ))}
          </Checkbox.Group>
          {error && touch && <Error>{error}</Error>}
          {description && <Description>{description}</Description>}
        </ControlWrap>
      </TitleWrap>
    </Wrap>
  );
});
