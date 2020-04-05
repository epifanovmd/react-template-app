import { Input } from "antd";
import { PasswordProps } from "antd/es/input";
import {
  AntWrapper,
  IAntWrapperProps,
} from "Components/controls/antWrapperComponent";
import React, { FC, memo } from "react";

interface IProps extends PasswordProps, IAntWrapperProps {}

export const PasswordInput: FC<IProps> = memo(props => (
  <AntWrapper Component={Input.Password} {...props} />
));
