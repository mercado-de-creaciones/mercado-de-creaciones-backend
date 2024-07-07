import { ChangePasswordDto } from "../../../../netlify/functions/auth/dtos/change-password.dto";

describe("Probar ChangePasswordDto", () => {
  test("Debe crear de forma exitosa un nuevo password cuando todos los campos son válidos", () => {
    const [error, dto] = ChangePasswordDto.create({
      newPassword: "password123456",
    });

    expect(error).toBeUndefined();
    expect(dto).toBeDefined();
    expect(dto?.newPassword).toBe("password123456");
  });

 test("Debe fallar al crear un usuario cuando falta la contraseña", () => {
   const [error] = ChangePasswordDto.create({});

   const errorMessage = "Missing new password";

   expect(error).toBe(errorMessage);
 });

 test("Debe fallar al crear un usuario cuando la contraseña es menor a 6 caracteres", () => {
   const [error] = ChangePasswordDto.create({
     newPassword: "pass",
   });

   const errorMessage = "Password too short, minimum 6 characters";

   expect(error).toBe(errorMessage);
 });
});
