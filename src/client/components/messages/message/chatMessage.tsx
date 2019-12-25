import React, {FC, memo} from "react";

interface IProps {
  name: string;
  message: string;
}

export const ChatMessage: FC<IProps> = memo(({name, message}) => {

  return (
    <p>
      <strong>{name}</strong> <em>{message}</em>
    </p>
  );
});
