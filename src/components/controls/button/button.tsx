import styled from "astroturf";
import { Spinner } from "Components/controls/spinner/spinner";
import React, { FC } from "react";

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
  background: #0094ff;
  border-radius: 8px;
  font: normal normal normal 16px Roboto;
  color: #ffffff;
  padding: 5px 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &.disabled {
    cursor: default;
    background: #a2a2a2;
  }
  position: relative;
`;

const StyledSpinner = styled(Spinner)`
  left: 50%;
  top: 50%;
`;
