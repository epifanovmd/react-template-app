import React, { FC } from "react";
import styled, { keyframes } from "styled-components";

interface IProps {
  className?: string;
  size?: number;
}

export const Spinner: FC<IProps> = ({ className, size = 25 }) => (
  <Wrap className={className} size={size}>
    <div />
    <div />
    <div />
    <div />
  </Wrap>
);

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
}
  100% {
    transform: rotate(360deg);
}
`;

const Wrap = styled.div<{ size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${({ size }) => size / 1.5}px;
    height: ${({ size }) => size / 1.5}px;
    margin: ${({ size }) => size / 10}px;
    border: ${({ size }) => size / 10}px solid #fff;
    border-radius: 50%;
    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
