import React from "react";
import "./styles.scss";

export interface IInterval {
  from: string;
  to: string;
}

interface IState {
  valueInputLeft: number;
  valueInputRight: number;
  value: number;
}

const MAX_PERCENT = 100;

export interface IRangeProps {
  onChange?: (values: IInterval | string) => void;
  onChanged?: (values: IInterval | string) => void;
  multiply?: boolean;
  maxValue?: number;
  minValue?: number;
  thumbText?: (value: number) => string;
  rightThumbText?: (value: number) => string;
  className?: string;
  outValue?: (value: number) => string;
}

export class Range extends React.Component<IRangeProps, IState> {

  public constructor(props: IRangeProps) {
    super(props);
    this.state = {
      value: props.minValue ? props.minValue : 0,
      valueInputLeft: props.minValue ? props.minValue : 0,
      valueInputRight: props.maxValue ? props.maxValue : 100,
    };
  }

  render(): JSX.Element {
    const {valueInputLeft, valueInputRight, value} = this.state;
    const {multiply, maxValue, minValue, thumbText, rightThumbText, className} = this.props;
    const left = `calc(${this.getOffsetLeft()}% - calc(50px * ${this.getOffsetLeft() / 100}))`;
    const right = `calc(${MAX_PERCENT - this.getOffsetRight()}% -
    calc(50px * ${(MAX_PERCENT - this.getOffsetRight()) / 100})`;

    return (
      <div className={`slider${className && (" " + className) || ""}`}>
        <div className={"slider__container"}>
          {
            multiply &&
            <div
              className={"slider__range"}
              style={{left: left, right: right}}
            />
          }
          <div className={"slider__inverse"} />
          {
            <div className={"slider__thumb-container"} style={!multiply ? {marginRight: "20px", marginLeft: 0} : {}}>
            <span className={"slider__thumb-left"} style={{left: `${this.getOffsetLeft()}%`}}>
              <span
                style={(valueInputLeft + 1 === valueInputRight) ? {left: "-10px"} : {}}
                className={"slider__thumb-left-value"}
              >
                {thumbText && thumbText(multiply ? valueInputLeft : value)}
              </span>
            </span>
            </div>}
          {
            multiply &&
            <div className={"slider__thumb-container"}>
              <span className={"slider__thumb-right"} style={{left: `${this.getOffsetRight()}%`}}>
                 <span
                   style={(valueInputLeft + 1 === valueInputRight) ? {left: "0px"} : {}}
                   className={"slider__thumb-left-value"}
                 >
                   {rightThumbText && rightThumbText(valueInputRight)}
                 </span>
              </span>
            </div>
          }
        </div>
        <input
          style={!multiply ? {width: "100%"} : {}}
          className={"slider__input"}
          type={"range"}
          value={multiply ? this.state.valueInputLeft : this.state.value}
          min={(minValue ? minValue : 0)}
          max={(maxValue ? maxValue : 100)}
          onChange={this.changeEventLeftInput}
          onMouseUp={this.mouseUpEventInput}
          onTouchEnd={this.mouseUpEventInput}
        />
        {
          multiply &&
          <input
            className={"slider__input"}
            type={"range"}
            value={this.state.valueInputRight}
            min={(minValue ? minValue : 0)}
            max={(maxValue ? maxValue : 100)}
            onChange={this.changeEventRightInput}
            onMouseUp={this.mouseUpEventInput}
            onTouchEnd={this.mouseUpEventInput}
          />
        }
      </div>
    );
  }

  private changeEventLeftInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {multiply, onChange} = this.props;
    const {value, valueInputRight, valueInputLeft} = this.state;
    if (event && event.target && event.target.value) {
      const eventValue = parseInt(event.target.value, 10);
      const newValueInputLeft = Math.min(eventValue, valueInputRight - 1);

      if (multiply) {
        this.setState({valueInputLeft: newValueInputLeft}, () => {
          onChange && onChange({
            from: `${valueInputLeft}`,
            to: `${valueInputRight}`,
          });
        });
      } else {
        this.setState({value: eventValue}, () => {
          onChange && onChange(`${value}`);
        });
      }
    }
  };

  private changeEventRightInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {onChange} = this.props;
    const {valueInputLeft, valueInputRight} = this.state;
    if (event && event.target && event.target.value) {
      const eventValue = parseInt(event.target.value, 10);
      const newValueInputRight = Math.max(eventValue, valueInputLeft + 1);
      this.setState({valueInputRight: newValueInputRight}, () => {
        onChange && onChange({
          from: `${valueInputLeft}`,
          to: `${valueInputRight}`,
        });
      });
    }
  };

  private mouseUpEventInput = (): void => {
    const {multiply, onChanged, outValue} = this.props;
    const {value, valueInputRight, valueInputLeft} = this.state;
    if (multiply) {
      onChanged && onChanged({
        from: outValue && outValue(valueInputLeft) || `${valueInputLeft}`,
        to:  outValue && outValue(valueInputRight) || `${valueInputRight}`,
      });
    } else {
      onChanged && onChanged(outValue && outValue(value) || `${value}`);
    }
  };

  private getOffsetLeft = (): number => {
    const {multiply, maxValue} = this.props;
    const offset = multiply ? this.state.valueInputLeft * (MAX_PERCENT / (maxValue ? maxValue : 100)) :
      this.state.value * (MAX_PERCENT / (maxValue ? maxValue : 100));

    return offset;
  };

  private getOffsetRight = (): number => {
    const {maxValue} = this.props;

    return this.state.valueInputRight * (MAX_PERCENT / (maxValue ? maxValue : 100));
  };
}
