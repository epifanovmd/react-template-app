import { Tooltip } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import { useWindowSize } from "Common/hooks/useWindowSize";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

export interface IProps {
  className?: string;
  text?: string;
  placement?: TooltipPlacement;
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
    <Tooltip title={text || children} placement={placement}>
      {content}
    </Tooltip>
  ) : (
    content
  );
};

const Container = styled.div<{ fluid?: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;

  &:before {
    content: attr(data-name);
  }
`;
