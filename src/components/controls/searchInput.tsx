import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import {
  AntWrapper,
  IAntWrapperProps,
} from "Components/controls/antWrapperComponent";
import React, { FC, memo } from "react";

interface IProps extends SearchProps, IAntWrapperProps {}

export const SearchInput: FC<IProps> = memo(props => (
  <AntWrapper Component={Input.Search} {...props} />
));
