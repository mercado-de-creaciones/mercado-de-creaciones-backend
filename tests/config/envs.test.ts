import { envs } from '../../netlify/config/envs';

describe("Probar envs.ts", () => {
  test('Debe retornar las variables de .env.test', () => {
    const mockEnv = {
      DATABASE_URL: "postgresql://mcreaciones_owner:vKi8mSx1AheN@ep-twilight-base-a5xovb1p-pooler.us-east-2.aws.neon.tech/mcreaciones?sslmode=require",
      JWT_SEED: "3d7c8a7dd285fe8d3c8f55f8fa5b3f9b4c5a1864f2f8e6c8a2c9f4f8fa8b9f4c2a5b8f9b4c5a1864f2f8e6c8a2c9f4f8fa8b9f4c",
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