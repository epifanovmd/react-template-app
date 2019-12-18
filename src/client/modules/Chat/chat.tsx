import React, {ChangeEvent, PureComponent} from "react";
import {ChatMessage} from "../../components/chat/chatMessage/chatMessage";
import {ChatInput} from "../../components/chat/chatInput/chatInput";

interface IProps {
}

interface IState {
  name: string;
  messages: { name: string, message: string }[];
  ws: WebSocket;
}

const URL = "ws://localhost:3030";

export class Chat extends PureComponent<IProps, IState> {
  ws = new WebSocket(URL);

  constructor(props: IProps) {
    super(props);
    this.state = {
      name: "Bob",
      messages: [],
      ws: new WebSocket(URL),
    };
  }

  setValue = (event: ChangeEvent<HTMLInputElement>) => this.setState({name: event.target.value});

  componentDidMount() {
    this.ws.onopen = () => {
      console.log("connected");
    };

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data);
      this.addMessage(message);
    };

    this.ws.onclose = () => {
      console.log("disconnected");
      this.setState({
        ws: new WebSocket(URL),
      });
    };
  }

  addMessage = (message: { name: string, message: string }) =>
    this.setState(state => ({messages: [message, ...state.messages]}));

  submitMessage = (messageString: string) => {
    const message = {
      recipientId: "7d429613-ecf3-4e85-8fd3-928cb4f18653",
      name: this.state.name,
      message: messageString,
    };
    this.ws.send(JSON.stringify(message));
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
