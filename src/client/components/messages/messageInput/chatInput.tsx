import React, {ChangeEvent, FC, FormEvent, memo, useState} from "react";
import {useTranslation} from "react-i18next";

interface IProps {
  onSubmitMessage: any;
}

export const ChatInput: FC<IProps> = memo(({onSubmitMessage}) => {
  const [state, setState] = useState({
    message: "",
  });
  const {t} = useTranslation();
  const setValue = (event: ChangeEvent<HTMLInputElement>) => setState({message: event.target.value});
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmitMessage(state.message);
    setState({message: ""});
  };

  return (
    <form
      action="."
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder={t("enter_message")}
        value={state.message}
        onChange={setValue}
      />
      <button type="submit">
        {t("send")}
      </button>
    </form>
  );
});
