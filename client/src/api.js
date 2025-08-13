// src/api.js  (CRA friendly)
let base = "http://localhost:5000";
if (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) {
  base = process.env.REACT_APP_API_URL;
}
export const API = base;
