import { DependencyList, KeyboardEvent, useCallback } from "react";

export function useOnEnter(callback: Function, dependencies: DependencyList) {
  return useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      callback();
    }
  }, dependencies);
}
