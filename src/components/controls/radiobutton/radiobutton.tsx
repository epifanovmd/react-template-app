import styled from "astroturf";
import React, { FC } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export const RadioButton: FC<IProps> = ({ className, title, ...rest }) => (
  <Radio className={`radio ${className}`}>
    <input {...rest} type="radio" />
    <span>{title}</span>
  </Radio>
);

const Radio = styled.label`
  $radioSize: 14px;
  $radioBorder: #d1d7e3;
  $radioActive: #0094ff;

  margin: 2px 0;
  display: block;
  cursor: pointer;
  input {
    display: none;
    & + span {
      line-height: $radioSize;
      height: $radioSize;
      padding-left: $radioSize;

      font: normal normal normal 14px/17px Roboto;
      letter-spacing: 0;
      color: #222222;

      display: block;
      position: relative;
      &:not(:empty) {
        padding-left: $radioSize + 8;
      }
      &:before,
      &:after {
        content: "";
        width: $radioSize;
        height: $radioSize;
        display: block;
        border-radius: 50%;
        left: 0;
        top: 0;
        position: absolute;
      }
      &:before {
        background: #ffffff;
        border: 1px solid #0094ff;
      }
      &:after {
        background: #fff;
        height: $radioSize - 6;
        width: $radioSize - 6;
        top: 4px;
        left: 4px;
      }
    }
    &:checked + span {
      &:before {
        background: #ffffff;
        border: 1px solid #0094ff;
      }
      &:after {
        background: #0094ff;
      }
    }
  }
`;
