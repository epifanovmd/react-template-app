import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";

import CheckIcon from "../../../icons/check.svg";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  touch?: boolean;
  error?: string;
}

export const CheckBox: FC<IProps> = ({
  className,
  children,
  checked,
  onChange,
  touch,
  error,
  ...rest
}) => {
  const [check, setCheck] = useState(checked);

  useEffect(() => {
    setCheck(checked);
  }, [checked]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCheck(event.target.checked);
      onChange && onChange(event);
    },
    [onChange],
  );

  return (
    <Wrapper className={className}>
      <Wrap htmlFor={"checkbox"}>
        <CheckWrap>{check && <StyledCheckIcon />}</CheckWrap>
        <StyledCheckbox
          {...rest}
          checked={check}
          onChange={handleChange}
          type={"checkbox"}
          id={"checkbox"}
        />
        <Label htmlFor={"checkbox"}>{children}</Label>
      </Wrap>
      <Error>{touch && error}</Error>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Wrap = styled.label`
  display: flex;
  align-items: center;
`;
const StyledCheckbox = styled.input`
  display: none;
`;
const Label = styled.label`
  margin-left: 5px;
`;

const CheckWrap = styled.div`
  cursor: pointer;
  border: 1px solid #0094ff;
  border-radius: 3px;
  height: 14px;
  width: 14px;
  position: relative;
`;

const StyledCheckIcon = styled(CheckIcon)`
  position: absolute;
  top: -3px;
  left: -3px;
  transform: scale(0.7);
`;

const Error = styled.div`
  font: normal normal normal 10px/13px Roboto;
  color: #e82828;
  padding-top: 2px;
  padding-left: 17px;
  height: 21px;
`;
