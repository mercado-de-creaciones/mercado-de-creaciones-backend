import { JwtAdapter } from "../../../netlify/config/adapters/jwt.adapter";

describe("Probar jwt.adapter.ts", () => {
  describe("generateToken", () => {
    test("Debe generar un token válido", async () => {
      const payload = { email: "prueba@gmail.com" };
      const token = await JwtAdapter.generateToken(payload, "2h");
      expect(token).not.toBeNull();
    });
  });

  describe("validateToken", () => {
    test("Debe validar un token y devolver el payload decodificado", async () => {
      const payload = { email: "prueba@gmail.com" };
      const token = (await JwtAdapter.generateToken(payload, "2h")) as string;
      const decoded = await JwtAdapter.validateToken<typeof payload>(token);
      console.log(decoded);
      expect(decoded).toEqual(expect.objectContaining(payload));
    });

    test("Debe devolver 'null' para un token no válido", async () => {
      const invalidToken = "invalid.token";
      const decoded = await JwtAdapter.validateToken(invalidToken);
      expect(decoded).toBeNull();
    });
  });
});
