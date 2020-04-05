import { SearchInput } from "Components/controls/searchInput";
import React, { FC, memo } from "react";

export const TestComponents: FC = memo(() => {
  console.log(1);

  return (
    <>
      <SearchInput onChange={(event: any) => console.log(event)} />
      <SearchInput onChange={(event: any) => console.log(event)} />
    </>
  );
});
