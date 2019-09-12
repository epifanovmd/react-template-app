import React, {FC} from "react";
import {Rangew} from "../../components/controls/range/range";

export const TestPage: FC = (): JSX.Element => {
  const thumb = (value: number) => `${value}`;

  return (
    <>
      <Rangew
        multiply={true}
        thumbText={thumb}
        rightThumbText={thumb}
        maxValue={10000}
      />
    </>
  );
};
