import { afterEach, expect, jest, test, beforeEach } from "@jest/globals";
import { describe, mock } from "node:test";
import { ProductService } from "../../netlify/services";
import { categoriesTable } from "../../netlify/data/schemas/categories.schema";
import { mockCategories } from "../_mocks_/db/categoryTable";
import { registerCategoryMocks, registerProductMocks } from "../_mocks_/products/dtoMocks";
import { mockProducts } from "../_mocks_/db/productsTable";
import { productsTable } from "../../netlify/data/schemas/products.schema";
import { FindAllOptionsDto } from "../../netlify/functions/product/dtos/findAll-options.dto";

jest.mock("../../netlify/data/db", () => {
  const mockSelect = jest.fn().mockReturnThis();
  const mockFrom = jest.fn();
  const mockLimit = jest.fn().mockReturnThis();
  const mockOffset = jest.fn();
  const mockInsert = jest.fn().mockReturnThis();
  const mockValues = jest.fn();
  const mockWhere = jest.fn().mockReturnThis();



  return {
    db: {
      select: mockSelect,
      from: mockFrom,
      limit: mockLimit,
      offset: mockOffset,
      where: mockWhere,

      insert: mockInsert,
      values: mockValues,
    },
  };
});

describe("Probar ProductService", () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Método count debería devolver el total de los productos", async () => {
    const { db } = require("../../netlify/data/db");
    db.from.mockResolvedValue([{ count: 4 }]);

    const result = await productService.count();

    expect(db.select).toHaveBeenCalled();
    expect(db.from).toHaveBeenCalledWith(productsTable);
    expect(result).toEqual(mockProducts.length);

  }
);


test("Método count debería devolver un error", async () => {
  const { db } = require("../../netlify/data/db");


  db.from.mockRejectedValue(new Error('Ocurrió un error al contar productos de la db'));

  await expect(productService.count()).rejects.toThrow("Ocurrió un error al contar productos de la db");
  expect(db.from).toHaveBeenCalledWith(productsTable);

}
);

  test("Método findAll debería devolver los productos segun los parametros enviados de paginacion", async () => {

    // Requerimos el db mockeado
    const { db } = require("../../netlify/data/db");
    db.from.mockReturnThis();
    db.offset.mockResolvedValue(mockProducts);

    let options = new FindAllOptionsDto(10, 0);

    const result = await productService.findAll(options);

    // Verificamos que se llamaron los metodos encadenados de drizzle ORM ya sea con argumentos o no
    expect(db.select).toHaveBeenCalled();
    expect(db.from).toHaveBeenCalledWith(productsTable);
    expect(db.limit).toHaveBeenCalled();
    expect(db.offset).toHaveBeenCalled();

    expect(result).toEqual(mockProducts);
  });

  test("Método findAll debería retornar un error", async () => {

    // Requerimos el db mockeado
    const { db } = require("../../netlify/data/db");
    db.from.mockRejectedValue(new Error('Ocurrió un error al recuperar productos de la db'));

    await expect(productService.findAll()).rejects.toThrow("Ocurrió un error al recuperar productos de la db");

    // Verificamos que se llamaron los metodos encadenados de drizzle ORM ya sea con argumentos o no
    expect(db.select).toHaveBeenCalled();
    expect(db.from).toHaveBeenCalledWith(productsTable);

  });

  test("Método findAll debería devolver los productos segun los parametros enviados con where", async () => {

    // Requerimos el db mockeado
    const { db } = require("../../netlify/data/db");
    db.from.mockReturnThis();
    db.where.mockResolvedValue(mockProducts);

    let options = new FindAllOptionsDto(undefined, undefined, 2, productsTable.id);

    const result = await productService.findAll(options);

    // Verificamos que se llamaron los metodos encadenados de drizzle ORM ya sea con argumentos o no
    expect(db.select).toHaveBeenCalled();
    expect(db.from).toHaveBeenCalledWith(productsTable);

    expect(result).toEqual(mockProducts);
  });


  test("Método insert inserta una nueva categoría", async () => {

    const newProduct = registerProductMocks.validMockData;

    // Requerimos el db mockeado
    const { db } = require("../../netlify/data/db");
    db.values.mockResolvedValue({ affectedRows: 1 });

    const result = await productService.insert(newProduct);

    expect(result).toEqual({ affectedRows: 1 });

    // Verificamos que se llamaron los metodos encadenados de drizzle ORM ya sea con argumentos o no
    expect(db.values).toHaveBeenCalled();
    expect(db.insert).toHaveBeenCalledWith(productsTable);

  });

});
