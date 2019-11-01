interface IProps {
  text: string;
}

import React, {FC, memo} from "react";

export const RenderComponent: FC<IProps> = memo(({text}) => {
  console.log(text);

  return (
    <div>{text}</div>
  );
});
