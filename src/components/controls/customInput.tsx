import { Input } from "antd";
import { InputProps } from "antd/es/input";
import {
  AntWrapper,
  IAntWrapperProps,
} from "Components/controls/antWrapperComponent";
import React, { FC, memo } from "react";

interface IProps extends InputProps, IAntWrapperProps {}

export const CustomInput: FC<IProps> = memo(props => (
  <AntWrapper Component={Input} {...props} />
));
