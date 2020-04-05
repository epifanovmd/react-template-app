import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import {
  AntWrapper,
  IAntWrapperProps,
} from "Components/controls/antWrapperComponent";
import React, { FC, memo } from "react";

const TextArea = Input.TextArea;

interface IProps extends TextAreaProps, IAntWrapperProps {}

export const CustomTextArea: FC<IProps> = memo(props => (
  <AntWrapper Component={TextArea} {...props} />
));
