import React, {Component} from "react";
import "./styles.scss";

export interface IItem {
  id: number;
  name: string;
}

interface IState {
  selected: IItem[];
  isOpen: boolean;
}

export interface ISelectProps {
  selected?: number[] | undefined;
  options?: IItem[];
  onChange?: (items: number[]) => void;
  multiply?: boolean;
}

export class Select extends Component<ISelectProps, IState> {
  private dropdownRef: HTMLDivElement | null = null;

  constructor(props: ISelectProps) {
    super(props);
    this.state = {
      selected: [],
      isOpen: false,
    };
  }

  public componentDidMount(): void {
    document.addEventListener("touchstart", this.handleClickOutside);
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("scroll", this.handleClickOutsideScroll);
    this.setSelectedId();
  }

  public componentWillUnmount(): void {
    document.removeEventListener("touchstart", this.handleClickOutside);
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("scroll", this.handleClickOutsideScroll);
  }

  componentDidUpdate(prevProps: Readonly<ISelectProps>): void {
    if (prevProps.options && prevProps.options.length === 0) {
      this.setSelectedId();
    }

    if (!this.props.selected && prevProps.selected) {
      this.setState({selected: []});
    }
  }

  public render(): JSX.Element {
    const {options} = this.props;
    const dropDown = this.getDropDownValue();
    const classNameSelect = (this.state.selected.length > 0) ?
      `${"drop-checkbox__selected"} ${"drop-checkbox__select"}` : "drop-checkbox__select";

    const classNameToggle =
      `${(this.state.isOpen) ? "drop-checkbox__select-toggle-open" : "drop-checkbox__select-toggle"}`;

    const classNameSelectOpen = (this.state.isOpen) ?
      "drop-checkbox__select-list-open" :
      "drop-checkbox__select-list";

    return (
      <div ref={this.setDropdownRef} className={"drop-checkbox__wrap"}>
        <div onClick={this.clickDropDown} className={"drop-checkbox__select-wrap"}>
          <span className={classNameSelect}>{dropDown}</span>
          <span className={classNameToggle} />
        </div>
        <div className={classNameSelectOpen}>
          {options && <div className={"drop-checkbox__select-items"}>{this.renderSelectItem(options)}</div>}
        </div>
      </div>
    );
  }

  private setSelectedId = (): void => {
    const {options, selected, onChange} = this.props;
    if (selected) {
      const _selected = options &&
        options.filter((item) => selected.some(someItem => item.id === someItem) && item);
      if (_selected) {
        this.setState({selected: _selected}, () => {
          onChange && onChange(this.state.selected.map(ex => ex.id));
        });
      }
    }
  };

  private setDropdownRef = (node: HTMLDivElement): void => {
    this.dropdownRef = node;
  };

  private handleClickOutsideScroll = (): void => {
    this.setState({isOpen: false});
  };

  private handleClickOutside = (event: any): void => {
    if (this.dropdownRef && !this.dropdownRef.contains(event.target)) {
      this.setState({isOpen: false});
    }
  };

  private clickDropDown = (): void => {
    this.setState({isOpen: !this.state.isOpen});
  };

  private toggleSelected = (item: IItem): void => {
    const {multiply} = this.props;
    const {selected} = this.state;
    let list = selected;
    const itemList = list.find((ex) => ex.id === item.id);
    if (multiply) {
      if (itemList) {
        list = list.filter((ex) => ex.id !== item.id);
      } else {
        list.push(item);
      }
    } else {
      list = [item];
    }
    this.setState({selected: list}, () => {
      const {onChange} = this.props;
      if (onChange) {
        onChange(this.state.selected.map(ex => ex.id));
      }
    });

  };

  private getToggleSelectedHandler = (item: IItem): () => void => {
    return ((): void => {
      const {multiply} = this.props;
      !multiply && this.setState({isOpen: false});
      this.toggleSelected(item);
    });
  };

  private isSelected = (item: IItem): boolean =>
    this.state.selected.map(e => e.id).indexOf(item.id) !== -1;

  private renderSelectItem = (list: IItem[]): JSX.Element[] => {
    return (
      list.map((item) => {
        const className = (this.isSelected(item)) ?
          "drop-checkbox__selected-item-active" :
          "drop-checkbox__selected-item";

        return (
          <div
            key={item.id}
            onClick={this.getToggleSelectedHandler(item)}
            className={"drop-checkbox__item-wrap"}
          >
            <span className={"drop-checkbox__select-item"}>{item.name}</span>
            <span
              className={className}
            />
          </div>
        );
      })
    );
  };

  private getDropDownValue(): string {
    if (this.state.selected.length > 1) {
      return `Выбрано: ${this.state.selected.length}`;
    }
    if (this.state.selected.length === 0) {
      return "Выбрать";
    } else {
      return (this.state.selected[0].name);
    }
  }
}
