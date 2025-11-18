import { CookieOptions } from "express";
import env from "./env";

export const getCookiesOptions = (clear?: boolean): CookieOptions => {
  return {
    // for 30 days
    expires: new Date(clear ? 0 : Date.now() + 30 * 24 * 60 * 60 * 1e3),
    path: "/",
    sameSite: "lax",
    secure: true,
    domain: env.DOMAIN,
    httpOnly: true,
  };
};

const cookies = {
  TID_API: "TID_API",
  TID_SOCKET: "TID_SOCKET",
  TOKEN: "TOKEN",
} as const;

export default cookies;
