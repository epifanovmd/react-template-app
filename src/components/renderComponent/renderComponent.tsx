import React, {FC, memo, useEffect} from "react";

interface IProps {
  text: string;
}

export const RenderComponentFC: FC<IProps> = memo( ({text}): JSX.Element => {
  useEffect(() => {
    console.log(text);
  });

  return (
    <>
      <div>{text}</div>
    </>
  );
});