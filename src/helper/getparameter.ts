export const getParameter = (key: string, data: any) => {
    return data.get(key) ?? {
        low: 0,
        high: 0,
        warning: 0
    };
  }