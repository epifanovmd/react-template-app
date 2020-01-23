import React, { ChangeEvent, FC, memo, useCallback, useState } from "react";
import { ChatMessage } from "../../components/messages/message/chatMessage";
import { ChatInput } from "../../components/messages/messageInput/chatInput";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../store/IAppState";
import { useTranslation } from "react-i18next";
import Helmet from "react-helmet";
import { MessagesThunk } from "./messagesThunk";

interface IProps {}

const Messages: FC<IProps> = memo(() => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [state, setState] = useState({ name: "Bob" });

  const setValue = (event: ChangeEvent<HTMLInputElement>) =>
    setState({ name: event.target.value });

  const submitMessage = useCallback(
    (messageString: string) => {
      const message = {
        recipientId: "7d429613-ecf3-4e85-8fd3-928cb4f18653",
        name: state.name,
        message: messageString,
      };

      dispatch(MessagesThunk.sendMessage(message));
    },
    [state.name],
  );

  const onSubmit = useCallback(
    (messageString: string) => submitMessage(messageString),
    [submitMessage],
  );

  const messages = useSelector(
    ({ messagesPage }: IAppState) => messagesPage.messages,
  );

  return (
    <>
      <Helmet>
        <title>{t("messages")}</title>
      </Helmet>
      <div>
        <label htmlFor="name">
          {t("name")}:&nbsp;
          <input
            type="text"
            id={"name"}
            placeholder={t("enter_name")}
            value={state.name}
            onChange={setValue}
          />
        </label>
        <ChatInput onSubmitMessage={onSubmit} />
        {messages.data.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.message}
            name={message.name}
          />
        ))}
      </div>
    </>
  );
});

export default Messages;
