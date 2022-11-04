export const initialData: any = {};
export const getInitialData = (tid: string) => {
  if (typeof window !== "undefined") {
    const d = window.__INITIAL_STATE__?.[tid];

    if (window.__INITIAL_STATE__) {
      setTimeout(() => {
        window.__INITIAL_STATE__[tid] = undefined;
      }, 1000);
    }

    return d;
  } else {
    const d = initialData?.[tid];

    if (initialData) {
      setTimeout(() => {
        initialData[tid] = undefined;
      }, 1000);
    }

    return d;
  }
};
