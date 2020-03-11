import React, { FC, memo, useCallback } from "react";
import { Input, Select } from "antd";
import { InputProps } from "antd/es/input";
import styled from "styled-components";
import { SelectProps } from "antd/es/select";

interface IProps extends SelectProps {
  error?: string;
  touch?: boolean;
  title?: string;
  name: string;
  positionTitle?: "top" | "left";
  requiredIcon?: boolean;
  minWidthTitle?: string;
  description?: string;
  maxWidth?: string;
  options: { label: string; value: string | number }[];
  isValid?: boolean;
}

const Wrap = styled.div<{ maxWidth?: string }>`
  display: flex;
  flex-flow: column;
  ${({ maxWidth }) => (maxWidth ? "flex-grow : 0" : "flex-grow : 1")};
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

const InputWrap = styled.div<{ maxWidth?: string }>`
  ${({ maxWidth }) => (maxWidth ? `max-width : ${maxWidth}` : "")};
  display: flex;
  flex-flow: column;
  flex-grow: 1;
`;

const TitleWrap = styled.div<{ positionTitle?: "top" | "left" }>`
  ${({ positionTitle }) => (positionTitle === "left" ? "display: flex;" : "")}
`;

export const CustomSelect: FC<IProps> = memo((props) => {
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
    options,
    ...rest
  } = props;
  const onChangeHandler = useCallback((value: any) => {
    const func: any = onChange;
    func && func({ target: { value: value, name: name } });
  }, []);

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
        <InputWrap maxWidth={maxWidth}>
          <Select onChange={onChangeHandler} {...rest}>
            {options.map((item, index) => (
              <Select.Option key={index} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
          {error && touch && <Error>{error}</Error>}
          {description && <Description>{description}</Description>}
        </InputWrap>
      </TitleWrap>
    </Wrap>
  );
});
