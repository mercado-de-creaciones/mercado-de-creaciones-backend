import { afterEach, expect, jest, test, beforeEach } from "@jest/globals";
import { describe } from "node:test";
import { CategoryService } from "../../netlify/services";
import { categoriesTable } from "../../netlify/data/schemas/categories.schema";
import { mockCategories } from "../_mocks_/db/categoryTable";
import { registerCategoryMocks } from "../_mocks_/products/dtoMocks";

jest.mock("../../netlify/data/db", () => {
  const mockSelect = jest.fn().mockReturnThis();
  const mockFrom = jest.fn().mockReturnThis();
  const mockLimit = jest.fn().mockReturnThis();
  const mockOffset = jest.fn();
  const mockInsert = jest.fn().mockReturnThis();
  const mockValues = jest.fn()


  return {
    db: {
      select: mockSelect,
      from: mockFrom,
      limit: mockLimit,
      offset: mockOffset,

      insert: mockInsert,
      values: mockValues,
    },
  };
});

describe("Probar CategoryService", () => {
  let categoryService: CategoryService;

  beforeEach(() => {
    categoryService = new CategoryService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Método findAll debería devolver las categorías", async () => {

    // Requerimos el db mockeado
    const { db } = require("../../netlify/data/db");
    db.offset.mockResolvedValue(mockCategories);

    const result = await categoryService.findAll(10, 0);

    // Verificamos que se llamaron los metodos encadenados de drizzle ORM ya sea con argumentos o no
    expect(db.select).toHaveBeenCalled();
    expect(db.from).toHaveBeenCalledWith(categoriesTable);
    expect(db.limit).toHaveBeenCalled();
    expect(db.offset).toHaveBeenCalled();

    expect(result).toEqual(mockCategories);
  });

  test("Método findAll debería retornar un error", async () => {

    // Requerimos el db mockeado
    const { db } = require("../../netlify/data/db");
    db.from.mockRejectedValue(new Error('Ocurrió un error al recuperar categorias de la db'));

    await expect(categoryService.findAll()).rejects.toThrow("Ocurrió un error al recuperar categorias de la db");

    // Verificamos que se llamaron los metodos encadenados de drizzle ORM ya sea con argumentos o no
    expect(db.select).toHaveBeenCalled();
    expect(db.from).toHaveBeenCalledWith(categoriesTable);

  });

  test("Método insert inserta una nueva categoría", async () => {

    const newCategory = registerCategoryMocks.validMockData;

    // Requerimos el db mockeado
    const { db } = require("../../netlify/data/db");
    db.values.mockResolvedValue({ affectedRows: 1 });

    const result = await categoryService.insert(newCategory);

    expect(result).toEqual({ affectedRows: 1 });

    // Verificamos que se llamaron los metodos encadenados de drizzle ORM ya sea con argumentos o no
    expect(db.values).toHaveBeenCalled();
    expect(db.insert).toHaveBeenCalledWith(categoriesTable);

  });

});
