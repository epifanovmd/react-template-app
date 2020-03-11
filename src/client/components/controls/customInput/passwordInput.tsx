import React, { FC, memo } from "react";
import { Input } from "antd";
import { InputProps } from "antd/es/input";
import styled from "styled-components";

interface IProps extends InputProps {
  error?: string;
  touch?: boolean;
  title?: string;
  positionTitle?: "top" | "left";
  requiredIcon?: boolean;
  minWidthTitle?: string;
  description?: string;
  maxWidth?: string;
}

const Wrap = styled.div`
  width: 100%;
  padding: 8px;
  min-width: 256px;
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
  ${({ minWidthTitle }) =>
    minWidthTitle ? `min-width: ${minWidthTitle}` : ""};
  padding-right: 10px;
  justify-content: ${({ positionTitle }) =>
    positionTitle === "left" ? "flex-end" : "flex-start"};
  align-items: flex-start;
`;

const Error = styled.div`
  color: red;
  min-width: 256px;
`;

const Description = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #8c8c8c;
`;

const InputWrap = styled.div<{ maxWidth?: string }>`
  ${({ maxWidth }) => (maxWidth ? `max-width : ${maxWidth}` : "")};
  width: 100%;
`;

const TitleWrap = styled.div<{ positionTitle?: "top" | "left" }>`
  ${({ positionTitle }) => (positionTitle === "left" ? "display: flex;" : "")}
`;

export const PasswordInput: FC<IProps> = memo((props) => {
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
    ...rest
  } = props;

  return (
    <Wrap>
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
          <Input.Password name={name} {...rest} />
          {error && touch && <Error>{error}</Error>}
          {description && <Description>{description}</Description>}
        </InputWrap>
      </TitleWrap>
    </Wrap>
  );
});
