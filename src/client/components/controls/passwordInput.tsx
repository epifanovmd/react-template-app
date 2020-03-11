import React, { FC, memo } from "react";
import { Input } from "antd";
import { InputProps } from "antd/es/input";
import styled, { css } from "styled-components";

interface IProps extends InputProps {
  error?: string;
  touch?: boolean;
  title?: string;
  positionTitle?: "top" | "left";
  requiredIcon?: boolean;
  minWidthTitle?: string;
  description?: string;
  maxWidth?: string;
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

const InputOverlay = styled(Input.Password)<{ isValid?: boolean }>`
  ${({ isValid }) =>
    isValid === false
      ? css`
          border: 1px solid red;
        `
      : ""};
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
    isValid,
    ...rest
  } = props;

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
          <InputOverlay isValid={isValid} name={name} {...rest} />
          {error && touch && <Error>{error}</Error>}
          {description && <Description>{description}</Description>}
        </InputWrap>
      </TitleWrap>
    </Wrap>
  );
});