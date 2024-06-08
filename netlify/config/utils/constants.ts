import { envs } from "../envs";

export const HEADERS = {
  json: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  cors: {
    "Access-Control-Allow-Origin": envs.FRONTEND_URL, 
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  },
};