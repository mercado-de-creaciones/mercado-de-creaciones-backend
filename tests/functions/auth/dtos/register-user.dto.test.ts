import { RegisterUserDto } from "../../../../netlify/functions/auth/dtos/register-user.dto";

describe("Probar RegisterUserDto", () => {
  
  test("Debería crear de forma exitosa un usuario cuando todos los campos son válidos", () => {
    const [error, dto] = RegisterUserDto.create({
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "prueba@example.com",
      password: "password123",
    });

    expect(error).toBeUndefined();
    expect(dto).toBeDefined();
    expect(dto?.email).toBe("prueba@example.com");
  });

  test("Debería fallar al crear un usuario cuando falta el nombre", () => {
    const [error] = RegisterUserDto.create({
      lastName: "Doe",
      username: "johndoe",
      email: "prueba@example.com",
      password: "password123",
    });
    const errorMessage = "Missing name";

    expect(error).toBe(errorMessage);
  });

  test("Debería fallar al crear un usuario cuando falta el apellido", () => {
    const [error] = RegisterUserDto.create({
      name: "John",
      username: "johndoe",
      email: "prueba@example.com",
      password: "password123",
    });
    const errorMessage = "Missing lastName";

    expect(error).toBe(errorMessage);
  });

  test("Debería fallar al crear un usuario cuando falta el username", () => {
    const [error] = RegisterUserDto.create({
      name: "John",
      lastName: "Doe",
      email: "prueba@example.com",
      password: "password123",
    });
    const errorMessage = "Missing username";

    expect(error).toBe(errorMessage);
  });

  test("Debería fallar  al crear un usuario cuando falta el email", () => {
    const [error] = RegisterUserDto.create({
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      password: "password123",
    });

    const errorMessage = "Missing email";

    expect(error).toBe(errorMessage);
  });

  test("Debería fallar al crear un usuario cuando el email no es válido", () => {
    const [error] = RegisterUserDto.create({
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "invalid-email",
      password: "password123",
    });

    const errorMessage = "Email is not valid";

    expect(error).toBe(errorMessage);
  });

  test("Debería fallar al crear un usuario cuando falta la contraseña", () => {
    const [error] = RegisterUserDto.create({
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "prueba@example.com",
    });

    const errorMessage = "Missing password";

    expect(error).toBe(errorMessage);
  });

  test("Debería fallar al crear un usuario cuando la contraseña es menor a 6 caracteres", () => {
    const [error] = RegisterUserDto.create({
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "prueba@example.com",
      password: "pass",
    });

    const errorMessage = "Password too short, minimum 6 characters";

    expect(error).toBe(errorMessage);
  });
});
