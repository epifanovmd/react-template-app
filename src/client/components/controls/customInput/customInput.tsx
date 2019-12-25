import React, {FC, memo} from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  touch?: boolean;
  title: string;
}

export const CustomInput: FC<IProps> = memo((props) => {
  const {title, touch, error, name, ...rest} = props;

  return (
    <div>
      {title && <label htmlFor={name}>{title}</label>}
      <input name={name} {...rest} />
      {error && touch && <div>{error}</div>}
    </div>
  );
});
