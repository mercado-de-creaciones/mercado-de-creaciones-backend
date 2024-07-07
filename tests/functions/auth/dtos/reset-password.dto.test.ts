import { ResetPasswordDto } from "../../../../netlify/functions/auth/dtos/reset-password.dto";

describe("Probar ResetPasswordDto", () => {
  test("Debe crear de forma exitosa un email cuando todos los campos son válidos", () => {
    const [error, dto] = ResetPasswordDto.create({
      email: "prueba@example.com",
    });

    expect(error).toBeUndefined();
    expect(dto).toBeDefined();
    expect(dto?.email).toBe("prueba@example.com");
  });

  test("Debe fallar al crear un usuario cuando falta el email", () => {
    const [error] = ResetPasswordDto.create({});

    const errorMessage = "Missing email";

    expect(error).toBe(errorMessage);
  });

  test("Debe fallar al crear un usuario cuando el email no es válido", () => {
    const [error] = ResetPasswordDto.create({
      email: "invalid-email",
    });

    const errorMessage = "Email is not valid";

    expect(error).toBe(errorMessage);
  });
});
