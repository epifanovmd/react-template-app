import React, {ChangeEvent, PureComponent} from "react";
import {ChatMessage} from "../../components/messages/message/chatMessage";
import {ChatInput} from "../../components/messages/messageInput/chatInput";
import {connect} from "react-redux";
import {messagesSelector} from "./messagesSelector";
import {messagesSocket} from "../../index";

interface IProps {
}

interface IState {
  name: string;
}

type TProps = IProps &
  ReturnType<typeof messagesSelector.mapState> &
  ReturnType<typeof messagesSelector.mapDispatch>;

class MessagesStatic extends PureComponent<TProps, IState> {

  constructor(props: TProps) {
    super(props);
    this.state = {
      name: "Bob",
    };
  }

  setValue = (event: ChangeEvent<HTMLInputElement>) => this.setState({name: event.target.value});

  submitMessage = (messageString: string) => {
    const message = {
      recipientId: "7d429613-ecf3-4e85-8fd3-928cb4f18653",
      name: this.state.name,
      message: messageString,
    };
    messagesSocket.emit("message", JSON.stringify(message));
    this.props.insertMessage(message);
  };

  onSubmit = (messageString: string) => this.submitMessage(messageString);

  render() {
    return (
      <>
        <div>
          <label htmlFor="name">
            Name:&nbsp;
            <input
              type="text"
              id={"name"}
              placeholder={"Enter your name..."}
              value={this.state.name}
              onChange={this.setValue}
            />
          </label>
          <ChatInput
            onSubmitMessage={this.onSubmit}
          />
          {this.props.messages.items.map((message, index) =>
            <ChatMessage
              key={index}
              message={message.message}
              name={message.name}
            />,
          )}
        </div>
      </>
    );
  }
}

export const Messages = connect(messagesSelector.mapState, messagesSelector.mapDispatch)(MessagesStatic);
