import { envs } from '../../netlify/config/envs';

describe("Probar envs.ts", () => {
  test('Debería retornar las variables de .env.test', () => {
    const mockEnv = {
      DATABASE_URL: expect.any(String),
      JWT_SEED: expect.any(String),
      SEND_EMAIL: expect.any(Boolean),
      MAILER_HOST: "smtp.gmail.com",
      MAILER_EMAIL: "prueba@gmail.com",
      MAILER_PORT: 465,
      MAILER_USER: "prueba@gmail.com",
      MAILER_SECRET_KEY: "secret_key_prueba",
      FRONTEND_URL: "http://localhost:5173",
    };

    expect(envs).toEqual(mockEnv);
  });

 });