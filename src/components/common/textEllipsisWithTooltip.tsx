import { useWindowSize } from "Common/hooks/useWindowSize";
import Tooltip from "rc-tooltip";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

export interface IProps {
  className?: string;
  text?: string;
  placement?:
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
  dangerouslySetInnerHTML?: { __html: string };
}

export const TextEllipsisWithTooltip: FC<IProps> = ({
  className,
  placement,
  text,
  children,
  dangerouslySetInnerHTML,
}) => {
  const { width } = useWindowSize();
  const [clamped, setClamped] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const updateClamped = useCallback(() => {
    if (container.current) {
      setClamped(container.current.scrollWidth > container.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      updateClamped();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const content = !dangerouslySetInnerHTML ? (
    <Container ref={container} className={className}>
      {children || text}
    </Container>
  ) : (
    <Container
      ref={container}
      className={className}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    />
  );

  return clamped ? (
    <Tooltip overlay={text || children} placement={placement}>
      {content}
    </Tooltip>
  ) : (
    content
  );
};

const Container = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;

  &:before {
    content: attr(data-name);
  }
`;
