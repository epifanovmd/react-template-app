import React, { FC } from "react";
import styled from "styled-components";
import { Spinner } from "../spinner";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
  disabled?: boolean;
}

export const Button: FC<IProps> = ({
  onClick,
  disabled,
  loading,
  children,
  ...rest
}) => (
  <Wrap {...rest} disabled={disabled} onClick={!disabled ? onClick : undefined}>
    {loading ? <StyledSpinner size={30} /> : children}
  </Wrap>
);

const Wrap = styled.div<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? "#a2a2a2" : "#0094ff")};
  border-radius: 8px;
  font: normal normal normal 16px Roboto;
  color: #ffffff;
  padding: 5px 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  position: relative;
`;

const StyledSpinner = styled(Spinner)`
  left: 50%;
  top: 50%;
`;
