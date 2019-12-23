import React, {FC} from "react";

interface IProps {
  name: string;
  message: string;
}

export const ChatMessage: FC<IProps> = ({name, message}) => {

  return (
    <p>
      <strong>{name}</strong> <em>{message}</em>
    </p>
  );
};
