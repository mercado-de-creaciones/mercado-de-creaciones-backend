import { defineConfig } from "drizzle-kit";
import { envs } from "./netlify/config/envs";
console.log(envs.DATABASE_URL);
export default defineConfig({
  schema: "./netlify/data/schemas/*",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: envs.DATABASE_URL,
  },
  migrations: {
    schema: 'public'
  }
});
