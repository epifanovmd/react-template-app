import React, {PureComponent} from "react";
import {SimpleDispatch} from "../../common/simpleThunk";
import {UsersThunk} from "../../modules/users/usersThunk";

interface IProps {
  text: string;
}

interface IState {
}

export class RenderComponent extends PureComponent<IProps, IState> {
  static componentGetInitialData () {
    return ( dispatch: SimpleDispatch ) =>
      dispatch( UsersThunk.getUsers() );
  }
  render(): JSX.Element {
    const {text} = this.props;

    return (
      <>
        <div>{text}</div>
      </>
    );
  }
}
