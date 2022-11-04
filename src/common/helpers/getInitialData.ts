export const initialData: any = {};
export const getInitialData = (tid: string) => {
  if (typeof window !== "undefined" && window.__INITIAL_STATE__?.[tid]) {
    return window.__INITIAL_STATE__[tid];
  } else {
    return initialData?.[tid];
  }
};
