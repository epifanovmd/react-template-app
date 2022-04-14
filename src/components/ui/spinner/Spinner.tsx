import React, { FC, useMemo } from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
  size?: number;
}

export const Spinner: FC<IProps> = ({ className, size = 25 }) => {
  const style = useMemo(
    () => ({
      width: `${size / 1.5}px`,
      height: `${size / 1.5}px`,
      margin: `${size / 10}px`,
      border: `${size / 10}px solid #fff`,
    }),
    [size],
  );

  return (
    <Wrap
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      className={className}
    >
      <div style={style} />
      <div style={style} />
      <div style={style} />
      <div style={style} />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    border-radius: 50%;
    animation: rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
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
