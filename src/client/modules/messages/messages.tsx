import React, {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ChatMessage } from "Components/messages/message/chatMessage";
import { ChatInput } from "Components/messages/messageInput/chatInput";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "Store/IAppState";
import { useTranslation } from "react-i18next";
import Helmet from "react-helmet";
import { MessagesAsyncActions } from "./messagesAsyncActions";
import { Table } from "Components/table/table";
import { TableHeader } from "Components/table/tableHeader";
import { TableRowCell } from "Components/table/tableRowCell";
import { TableRow } from "Components/table/tableRow";

import styles from "./styles.module.scss";
import { UsersAsyncActions } from "../users/usersAsyncActions";
import classNames from "classnames";

interface IProps {}

const Messages: FC<IProps> = memo(() => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UsersAsyncActions.getUsers());
  }, []);

  const [name, setName] = useState("Bob");
  const [recipientId, setRecipientId] = useState("");

  const setValue = (event: ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const submitMessage = useCallback(
    (messageString: string) => {
      const message = {
        recipientId,
        name,
        message: messageString,
      };

      dispatch(MessagesAsyncActions.sendMessage(message));
    },
    [dispatch, name, recipientId],
  );

  const onSubmit = useCallback(
    (messageString: string) => {
      if (recipientId && name) {
        submitMessage(messageString);
      }
    },
    [submitMessage, recipientId, name],
  );

  const messages = useSelector(
    ({ messagesPage }: IAppState) => messagesPage.messages,
  );
  const users = useSelector(({ usersPage }: IAppState) => usersPage.users);

  const onSetRecipientId = useCallback(
    (id: string) => () => {
      setRecipientId(id);
    },
    [setRecipientId],
  );

  return (
    <div className={styles.container}>
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
            value={name}
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
      <div>
        <Table>
          <TableHeader>
            <TableRowCell>Пользователи</TableRowCell>
          </TableHeader>
          {users.data.map((item) => (
            <TableRow
              className={classNames(styles.user, {
                [styles["active-user"]]: item.id === recipientId,
              })}
              key={item.id}
            >
              <TableRowCell onClick={onSetRecipientId(item.id)}>
                {item.username}
              </TableRowCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
});

export default Messages;
