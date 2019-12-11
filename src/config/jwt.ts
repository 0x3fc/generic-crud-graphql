const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;

export const __jwt = {
  refreshExpire: 1 * MONTH,
  accessExpire: 7 * DAY,
  secret: process.env.JWT_SECRET || "topsecret",
  cookieMaxAge: 1 * MONTH * 1000,
  cookieName: "token",
};
