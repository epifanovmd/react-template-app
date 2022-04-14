import React, { FC } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export const Radiobutton: FC<IProps> = ({ className, title, ...rest }) => (
  <label className={`radio ${className}`}>
    <input {...rest} type="radio" />
    <span>{title}</span>
  </label>
);
