import React, {ChangeEvent, FormEvent, PureComponent} from "react";

interface IProps {
  onSubmitMessage: any;
}

interface IState {
  message: string;
}

export class ChatInput extends PureComponent<IProps, IState> {
  state = {
    message: "",
  };

  setValue = (event: ChangeEvent<HTMLInputElement>) => this.setState({message: event.target.value});
  onSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.props.onSubmitMessage(this.state.message);
    this.setState({message: ""});
  };

  render() {
    return (
      <form
        action="."
        onSubmit={this.onSubmit}
      >
        <input
          type="text"
          placeholder={"Enter message..."}
          value={this.state.message}
          onChange={this.setValue}
        />
        <input type="submit" value={"Send"} />
      </form>
    );
  }
}
