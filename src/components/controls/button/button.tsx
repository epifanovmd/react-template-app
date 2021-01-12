import { Spinner } from "Components/controls/spinner/spinner";
import React, { FC } from "react";
import styled from "styled-components";

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
  background: ${({ disabled }) => (disabled ? "#A2A2A2" : "#0094ff")};
  border-radius: 31px;
  width: 100%;
  font: normal normal normal 18px/22px Roboto;
  color: #ffffff;
  padding: 16px 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  position: relative;
  line-height: 31px;
`;

const StyledSpinner = styled(Spinner)`
  left: 50%;
  top: 50%;
`;
