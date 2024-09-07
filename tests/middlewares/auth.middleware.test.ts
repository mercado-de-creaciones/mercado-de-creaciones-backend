import { UserService } from "../../netlify/services";
import { validateJWT } from "../../netlify/middlewares";
import { JwtAdapter } from "../../netlify/config/adapters";

describe("Probar middleware validateJWT", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Debería devolver 401 si el token de autorización no es proporcionado", async () => {
    const message = "No token provided";

    const result = await validateJWT("");

    expect(result).toEqual(
      expect.objectContaining({
        statusCode: 401,
        body: expect.stringContaining(message),
      })
    );
  });

  test("Debería devolver 401 si el token de autorización no empieza con 'Bearer'", async () => {
    const message = "Invalid Bearer token";

    const result = await validateJWT("Token abc123");

    expect(result).toEqual(
      expect.objectContaining({
        statusCode: 401,
        body: expect.stringContaining(message),
      })
    );
  });

  test("Debería devolver 401 si el token es inválido", async () => {
    const message = "Invalid token";

    const result = await validateJWT("Bearer invalidtoken");

    expect(result).toEqual(
      expect.objectContaining({
        statusCode: 401,
        body: expect.stringContaining(message),
      })
    );
  });

  test("Debería devolver 401 si el usuario no se encuentra en la base de datos", async () => {
    const validPayload = { email: "user@example.com" };

    // Mock para pasar payload para validar token y mock cuando no se retorna el usuario del token
    jest.spyOn(JwtAdapter, "validateToken").mockResolvedValue(validPayload);
    jest.spyOn(UserService.prototype, "innerJoinCountry").mockResolvedValue(undefined);

    const message = "Invalid token - User not found";
    const result = await validateJWT("Bearer validtoken");

    expect(result).toEqual(
      expect.objectContaining({
        statusCode: 401,
        body: expect.stringContaining(message),
      })
    );
  });

  test("Debería devolver 200 y datos del usuario si el token es válido y se encuentra el usuario", async () => {
    const validPayload = { email: "moi.prado20@gmail.com" };
    const mockUser = {
      id: 1,
      name: "Moises",
      lastName: "Prado",
      username: "Admoises",
      email: "moisesfriki15@gmail.com",
      img: "https://www.xtrafondos.com/wallpapers/programacion-computadora-y-lentes-10837.jpg",
      country: "Argentina",
    };

    jest.spyOn(JwtAdapter, "validateToken").mockResolvedValue(validPayload);
    jest.spyOn(UserService.prototype, "innerJoinCountry").mockResolvedValue(mockUser);

    const result = await validateJWT("Bearer validtoken");

    expect(result).toEqual(
      expect.objectContaining({
        statusCode: 200,
        body: JSON.stringify(mockUser),
      })
    );
  });

  test("Debería devolver 500 si hay un error interno del servidor", async () => {
    const message = "Internal server error";
    // Mock para cuaando validateToken() tiene un error 500
    jest.spyOn(JwtAdapter, "validateToken").mockRejectedValue(message);

    const result = await validateJWT("Bearer validtoken");

    expect(result).toEqual(
      expect.objectContaining({
        statusCode: 500,
        body: expect.stringContaining(message),
      })
    );
  });
});
