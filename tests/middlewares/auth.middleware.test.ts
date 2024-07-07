import { validateJWT } from "../../netlify/middlewares/auth.middleware";
import { JwtAdapter } from "../../netlify/config/adapters";


describe("Probar middleware validateJWT", () => {
  test("Debe devolver 401 si el token de autorización no es proporcionado", async () => {
    const message = "No token provided";

    const result = await validateJWT("");

    expect(result).toEqual(
      expect.objectContaining({
        statusCode: 401,
        body: expect.stringContaining(message),
      })
    );
  });

  test("Debe devolver 401  si el token de autorización no empieza con 'Bearer'", async () => {
    const message = "Invalid Bearer token";

    const result = await validateJWT("Token abc123");

    expect(result).toEqual(
      expect.objectContaining({
        statusCode: 401,
        body: expect.stringContaining(message),
      })
    );
  });

  test("Debe devolver 401 si el token es inválido", async () => {
    const message = "Invalid token";

    const result = await validateJWT("Bearer invalidtoken");

    expect(result).toEqual(
      expect.objectContaining({
        statusCode: 401,
        body: expect.stringContaining(message),
      })
    );
  });

  test("Debe devolver 401 si el usuario no se encuentra en la base de datos", async () => {
    const validPayload = { email: "user@example.com" };
    jest.spyOn(JwtAdapter, "validateToken").mockResolvedValue(validPayload);

    const message = "Invalid token - User not found";
    const result = await validateJWT("Bearer validtoken");

    expect(result).toEqual(
      expect.objectContaining({
        statusCode: 401,
        body: expect.stringContaining(message),
      })
    );
  });

  test.skip("Debe devolver 200 y datos del usuario si el token es válido y se encuentra el usuario", async () => {
    // Caso difícil de probar debido a la dependencia de la base de datos  
  });

  test("Debe devolver 500 si hay un error interno del servidor", async () => {
    const message = "Internal server error";

    jest
      .spyOn(JwtAdapter, "validateToken")
      .mockRejectedValue(message);
    
    const result = await validateJWT("Bearer validtoken");

    expect(result).toEqual(
      expect.objectContaining({
        statusCode: 500,
        body: expect.stringContaining(message),
      })
    );
  });
});
