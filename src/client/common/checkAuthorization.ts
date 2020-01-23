import { decode } from "jsonwebtoken";

export const checkAuthorization = (token: string) => {
  if (token) {
    const decodedToken = decode(token);
    if (Date.now() >= (decodedToken as any).exp * 1000) {
      return false;
    }
  } else {
    return false;
  }

  return true;
};
