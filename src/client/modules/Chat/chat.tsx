import React, {ChangeEvent, PureComponent} from "react";
import {ChatMessage} from "../../components/chat/chatMessage/chatMessage";
import {ChatInput} from "../../components/chat/chatInput/chatInput";
import {connect} from "socket.io-client";

interface IProps {
}

interface IState {
  name: string;
  messages: { name: string, message: string }[];
  ioSocket: any;
}

const SOCKET_URL = "http://localhost:3131";

export class Chat extends PureComponent<IProps, IState> {
  ioSocket = connect(SOCKET_URL);

  constructor(props: IProps) {
    super(props);
    this.state = {
      name: "Bob",
      messages: [],
      ioSocket: connect(SOCKET_URL),
    };
  }

  setValue = (event: ChangeEvent<HTMLInputElement>) => this.setState({name: event.target.value});

  componentDidMount() {
    this.ioSocket.on("connect", () => {
      console.log("connected");
    });
    this.ioSocket.on("SET_NAME", (name: any) => {
      this.setState({name});
    });

    this.ioSocket.on("message", (evt: any) => {
      console.log(evt);
      const message = JSON.parse(evt);
      this.addMessage(message);
    });

    this.ioSocket.on("error", (error: any) => {
      console.log("SocketError: ", error);
    });

    this.ioSocket.on("disconnect", () => {
      console.log("disconnected");
      this.setState({
        ioSocket: connect(SOCKET_URL),
      });
    });
  }

  componentWillUnmount(): void {
    this.ioSocket.close();
  }

  addMessage = (message: { name: string, message: string }) =>
    this.setState(state => ({messages: [message, ...state.messages]}));

  submitMessage = (messageString: string) => {
    const message = {
      recipientId: "7d429613-ecf3-4e85-8fd3-928cb4f18653",
      name: this.state.name,
      message: messageString,
    };
    this.ioSocket.emit("message", JSON.stringify(message));
    this.addMessage(message);
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
          {this.state.messages.map((message, index) =>
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
