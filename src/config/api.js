const isProduction = process.env.NODE_ENV === "production";

const rawApiUrl =
  process.env.REACT_APP_API_URL ||
  (isProduction
    ? process.env.REACT_APP_PROD_URL
    : process.env.REACT_APP_DEV_URL) ||
  "http://localhost:5000";

export const apiUrl = rawApiUrl.replace(/\/+$/, "");
