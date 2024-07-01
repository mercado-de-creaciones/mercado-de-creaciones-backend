import { envs } from "../../../netlify/config/envs";

describe("hello function", () => {
  test("returns a greeting", async () => {
    console.log("Probando test de hello.ts");
   console.log(envs.DATABASE_URL);
  });
});
