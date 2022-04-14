export const getPageInitialData = (pathName: string) => {
  if (typeof window !== "undefined" && window.__INITIAL_STATE__?.[pathName]) {
    return window.__INITIAL_STATE__[pathName];
  }
};
