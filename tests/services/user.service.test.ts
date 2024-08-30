import { UserService } from "../../netlify/services";

import { usersTable } from "../../netlify/data/schemas/user.schema";

jest.mock("../../netlify/data/db", () => {
  const mockSelect = jest.fn().mockReturnThis();
  const mockFrom = jest.fn().mockReturnThis();
  const mockWhere = jest.fn();

  const mockInsert = jest.fn().mockReturnThis();
  const mockValues = jest.fn()

  const mockUpdate = jest.fn().mockReturnThis();
  const mockSet = jest.fn().mockReturnThis();

  return {
    db: {
      select: mockSelect,
      from: mockFrom,
      where: mockWhere,

      insert: mockInsert,
      values: mockValues,

      update: mockUpdate,
      set: mockSet,
    },
  };
});

describe("Probar UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Método findOne debería devolver un usuario si se encuentra en la BD", async () => {
    const mockUser = { id: 1, name: "John Doe", email: "john@example.com" };
    const mockField = usersTable.email;

    // Requerimos el db mockeado
    const { db } = require("../../netlify/data/db");
    db.where.mockResolvedValue([mockUser]);

    const result = await userService.findOne(mockField, "john@example.com");

    // Verificamos que se llamaron los metodos encadenados de drizzle ORM ya sea con argumentos o no
    expect(db.select).toHaveBeenCalled();
    expect(db.from).toHaveBeenCalledWith(usersTable);
    expect(db.where).toHaveBeenCalled();

    expect(result).toEqual(mockUser);
  });

  test("Método insert debería agregar un nuevo usuario a la BD", async () => {
    const newUser = {
      name: "Jane Doe",
      email: "jane@example.com",
      password: "hashed_password",
    };

    const { db } = require("../../netlify/data/db");
    db.values.mockResolvedValue({ affectedRows: 1 });

    const result = await userService.insert(newUser);

    expect(db.insert).toHaveBeenCalledWith(usersTable);
    expect(db.values).toHaveBeenCalled();

    expect(result).toEqual({ affectedRows: 1 });
  });

  test("Método update debería actualizar un usuario en la BD", async () => {
    const updatedValues = { name: "Jane Doe Updated" };
    const mockField = usersTable.email;

    const { db } = require("../../netlify/data/db");
    db.where.mockResolvedValue({ affectedRows: 1 });

    const result = await userService.update(
      updatedValues,
      mockField,
      "jane@example.com"
    );

    expect(db.update).toHaveBeenCalledWith(usersTable);
    expect(db.set).toHaveBeenCalledWith(updatedValues);
    expect(db.where).toHaveBeenCalled();

    expect(result).toEqual({ affectedRows: 1 });
  });
});
