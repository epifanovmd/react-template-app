import { GetComponentProps } from "Common/componentProps";
import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

export interface IAntWrapperProps {
  error?: string;
  isValid?: boolean;
  touch?: boolean;
  title?: string;
  name?: string;
  positionTitle?: "top" | "left";
  requiredIcon?: boolean;
  minWidthTitle?: string;
  description?: string;
  maxWidth?: string;
}

interface IProps<T> extends IAntWrapperProps {
  Component: T;
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

export const AntWrapper = <T extends any>(
  props: IProps<T> & GetComponentProps<T> & { children?: ReactNode },
) => {
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
    Component,
    children,
    // @ts-ignore
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
        <ControlWrap maxWidth={maxWidth}>
          <Component name={name} {...rest}>
            {children}
          </Component>
          {error && touch && <Error>{error}</Error>}
          {description && <Description>{description}</Description>}
        </ControlWrap>
      </TitleWrap>
    </Wrap>
  );
};
