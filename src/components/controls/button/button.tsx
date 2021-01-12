import styled from "astroturf";
import { Spinner } from "Components/controls/spinner/spinner";
import React, { FC } from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  loading?: boolean;
  disabled?: boolean;
}

export const Button: FC<IProps> = ({
  text,
  onClick,
  disabled,
  loading,
  ...rest
}) => (
  <Wrap {...rest} disabled={disabled} onClick={!disabled ? onClick : undefined}>
    {loading ? <StyledSpinner size={30} /> : text}
  </Wrap>
);

const Wrap = styled.div<{ disabled?: boolean }>`
  background: #0094ff;
  border-radius: 31px;
  width: 100%;
  font: normal normal normal 18px/22px Roboto;
  color: #ffffff;
  padding: 16px 20px;
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
  line-height: 31px;
`;

const StyledSpinner = styled(Spinner)`
  left: 50%;
  top: 50%;
`;
