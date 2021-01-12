import React, { CSSProperties, FC } from "react";
import styled from "styled-components";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  touch?: boolean;
  error?: string;
  label?: string;
  icon?: JSX.Element;
  wrapStyle?: CSSProperties;
}

export const Input: FC<IProps> = ({
  label,
  wrapStyle,
  error,
  touch,
  icon,
  ...rest
}) => (
  <Wrap style={wrapStyle}>
    {label && <Label>{label}</Label>}
    <InputWrap>
      {icon && <Icon>{icon}</Icon>}
      <StyledInput {...rest} hasIcon={!!icon} />
    </InputWrap>
    <Error>{touch && error}</Error>
  </Wrap>
);

const Wrap = styled.div`
  min-width: 343px;
  min-height: 50px;
  border-radius: 8px;
  color: #a2a2a2;
`;

const InputWrap = styled.div`
  position: relative;
  border-radius: 8px;
  background: #f5f8fa;
`;

const Icon = styled.div`
  position: absolute;
  height: 100%;

  display: flex;
  align-items: center;
  padding: 0 18px;
`;
const StyledInput = styled.input<{ hasIcon?: boolean }>`
  font: normal normal normal 14px/17px Roboto;
  color: #a2a2a2;
  padding: 17px;
  border: none;
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 8px;

  padding-left: ${({ hasIcon }) => (hasIcon ? 52 : 17)}px;
  &::placeholder {
    font: normal normal normal 14px/17px Roboto;
    color: #a2a2a2;
  }
`;
const Error = styled.div`
  font: normal normal normal 10px/13px Roboto;
  color: #e82828;
  padding-top: 2px;
  padding-left: 17px;
  height: 21px;
`;

const Label = styled.div`
  padding-bottom: 3px;
  padding-left: 17px;
  font: normal normal normal 14px/17px Roboto;
  color: #222222;
`;
