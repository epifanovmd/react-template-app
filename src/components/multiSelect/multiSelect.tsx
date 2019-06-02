import React, {Component} from "react";
import "./styles.scss";

import _ from "lodash";

export interface IItem {
  id: string;
  name: string;
}

interface IState {
  selected: IItem[];
  isOpen: boolean;
}

interface IProps {
  selectedId?: string | undefined;
  list: IItem[];
  onChange: (items: string[]) => void;
  name: string;
}

export class MultiSelect extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selected: [],
      isOpen: false,
    };
  }

  setSelectedId = (): void => {
    if (this.props.selectedId) {
      const _selcted = this.props.list.find((item) => item.id == this.props.selectedId);
      if (_selcted != null) {
        this.setState({selected: [{id: _selcted.id, name: _selcted.name}]});
      }
    }
  };

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

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    if (_.isEmpty(prevProps.list)) {
      this.setSelectedId();
    }

    if (!this.props.selectedId && prevProps.selectedId) {
      this.setState({selected: []});
    }
  }

  private handleClickOutsideScroll = (): void => {
    this.setState({isOpen: false});
  };

  private handleClickOutside = (event: any): void => {
    if (!event.target.closest(`.${this.props.name}`)) {
      this.setState({isOpen: false});
    }
  };
  private clickDropDown = (): void => {
    this.setState({isOpen: !this.state.isOpen});
  };
  private toggleSelectedExercises = (item: IItem): void => {
    let list = this.state.selected;
    const exercise = list.find((ex) => ex.id === item.id);
    if (exercise) {
      list = list.filter((ex) => ex.id !== item.id);
    } else {
      list.push(item);
    }
    this.setState({selected: list}, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.selected.map(ex => ex.id));
      }
    });

  };
  private getToggleSelectedHandler = (item: IItem): () => void => {
    return ((): void =>
      this.toggleSelectedExercises(item));
  };
  private isSelected = (item: IItem): boolean =>
    this.state.selected.map(e => e.id).indexOf(item.id) !== -1;
  private renderSelectItem = (ExerciseList: IItem[]): JSX.Element[] => {
    return (
      ExerciseList.map((item) => {
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

  public render(): JSX.Element {
    const {list} = this.props;
    const dropDown = this.getDropDownValue();
    const classNameSelect = (this.state.selected.length > 0) ?
      `${"drop-checkbox__selected"} ${"drop-checkbox__select"}` : "drop-checkbox__select";

    const classNameToggle = `
                   ${(this.state.isOpen) ?
      "drop-checkbox__select-toggle-open" :
      "drop-checkbox__select-toggle"}`;

    const classNameSelectOpen = `
                    ${(this.state.isOpen) ?
      "drop-checkbox__select-list-open" :
      "drop-checkbox__select-list"}`;

    return (
      <div className={`${"drop-checkbox__wrap"} ${this.props.name}`}>
        <div onClick={this.clickDropDown} className={"drop-checkbox__select-wrap"}>
          <span className={classNameSelect}>{dropDown}</span>
          <span className={classNameToggle}/>
        </div>
        <div className={classNameSelectOpen}>
          <div className={"drop-checkbox__select-items"}>{this.renderSelectItem(list)}</div>
        </div>
      </div>
    );
  }

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
