import React, { FC, memo, useCallback } from "react";
import { DatePicker } from "antd";
import styled, { css } from "styled-components";
import { RangePickerProps } from "antd/es/date-picker/interface";
import { RangePickerValue } from "antd/lib/date-picker/interface";
import moment from "moment";

const { RangePicker } = DatePicker;

interface IProps
  extends Omit<RangePickerProps, "onChange" | "onBlur" | "value"> {
  error?: string;
  touch?: boolean;
  title?: string;
  name?: string;
  positionTitle?: "top" | "left";
  requiredIcon?: boolean;
  minWidthTitle?: string;
  description?: string;
  maxWidth?: string;
  value?: { from: string; to: string };
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Wrap = styled.div<{ maxWidth?: string }>`
  display: flex;
  flex-flow: column;
  ${({ maxWidth }) =>
    maxWidth
      ? css`
          flex-grow: 0;
          flex-basis: auto;
        `
      : css`
          flex-grow: 1;
          flex-basis: 0;
        `};
  padding: 8px;
  position: relative;
`;

const Required = styled.div`
  color: red;
  display: flex;
  font-size: 14px;
  padding-right: 3px;
  align-items: center;
`;

const Label = styled.label<{ minWidthTitle?: string; positionTitle?: string }>`
  ${({ positionTitle }) =>
    positionTitle === "left" ? "padding-top: 5px;" : ""};
  display: flex;
  white-space: nowrap;
  ${({ minWidthTitle }) =>
    minWidthTitle ? `min-width: ${minWidthTitle}` : ""};
  padding-right: 10px;
  justify-content: ${({ positionTitle }) =>
    positionTitle === "left" ? "flex-end" : "flex-start"};
  align-items: flex-start;
`;

const Error = styled.div`
  color: red;
`;

const Description = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #8c8c8c;
`;

const ControlWrap = styled.div<{ maxWidth?: string }>`
  ${({ maxWidth }) => (maxWidth ? `max-width : ${maxWidth}` : "")};
  display: flex;
  flex-flow: column;
  flex-grow: 1;
`;

const TitleWrap = styled.div<{ positionTitle?: "top" | "left" }>`
  ${({ positionTitle }) => (positionTitle === "left" ? "display: flex;" : "")}
`;

export const CustomRangePicker: FC<IProps> = memo((props) => {
  const {
    title,
    touch,
    error,
    name,
    positionTitle,
    requiredIcon,
    minWidthTitle,
    description,
    maxWidth,
    onChange,
    onBlur,
    value,
    ...rest
  } = props;

  const onChangeHandler: (
    dates: RangePickerValue,
    dateStrings: [string, string],
  ) => void = useCallback(
    ({}, values) => {
      const func: any = onChange;
      func &&
        func({
          target: {
            value: { from: values[0] || "", to: values[1] || "" },
            name,
          },
        });
    },
    [onChange],
  );
  const onBlurHandler: (status: boolean) => void = useCallback(
    (status) => {
      const func: any = onBlur;
      !status && func && func({ target: { value: true, name } });
    },
    [onBlur],
  );

  return (
    <Wrap maxWidth={maxWidth}>
      <TitleWrap positionTitle={positionTitle}>
        {title && (
          <Label
            positionTitle={positionTitle}
            minWidthTitle={minWidthTitle}
            htmlFor={name}
          >
            {requiredIcon && <Required>*</Required>}
            {title}
          </Label>
        )}
        <ControlWrap maxWidth={maxWidth}>
          <RangePicker
            onChange={onChangeHandler}
            onOpenChange={onBlurHandler}
            value={
              value
                ? (value.from &&
                    value.to && [moment(value.from), moment(value.to)]) ||
                  undefined
                : undefined
            }
            {...rest}
          />
          {error && touch && <Error>{error}</Error>}
          {description && <Description>{description}</Description>}
        </ControlWrap>
      </TitleWrap>
    </Wrap>
  );
});
