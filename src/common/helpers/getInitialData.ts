class InitialData {
  public data: any = {};

  public setData = (key: string, value: any) => {
    this.data[key] = value;
  };

  public clearData = () => {
    this.data = {};
  };

  public removeData = (key: string) => {
    this.data[key] = undefined;
  };

  public getData = (key: string) => this.data[key];
}

export const initialData = new InitialData();

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
    return initialData.getData(tid);
  }
};
