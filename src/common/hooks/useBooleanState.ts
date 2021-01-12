import { useCallback, useState } from "react";

type IUseBooleanState = [boolean, () => void, () => void];

export function useBooleanState(defaultValue = false): IUseBooleanState {
  const [state, setState] = useState(defaultValue);

  const setTrue = useCallback(() => {
    setState(true);
  }, [setState]);

  const setFalse = useCallback(() => {
    setState(false);
  }, [setState]);

  return [state, setTrue, setFalse];
}
