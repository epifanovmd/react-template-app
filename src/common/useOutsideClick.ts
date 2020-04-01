import { createRef, useEffect } from "react";

export const useOutsideClick = (callback: () => void) => {
  const ref = createRef<any>();

  const listener = (e: MouseEvent | TouchEvent) => {
    if (ref.current && !ref?.current.contains(e.target as any)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  });

  return ref;
};
