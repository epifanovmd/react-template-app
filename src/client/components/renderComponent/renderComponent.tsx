import React, {PureComponent} from "react";
import {SimpleDispatch} from "../../common/simpleThunk";
import {UsersThunk} from "../../modules/users/usersThunk";

interface IProps {
  text: string;
}

interface IState {
}

export class RenderComponent extends PureComponent<IProps, IState> {
  render(): JSX.Element {
    const {text} = this.props;

    return (
        <div>{text}</div>
    );
  }
}
