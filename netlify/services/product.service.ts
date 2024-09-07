import { db } from "../data/db";
import { productsTable } from "../data/schemas/products.schema";
import { count, eq } from "drizzle-orm";
import { ProductDto } from "../functions/product/dtos";
import { FindAllOptionsDto } from "../functions/product/dtos/findAll-options.dto";

type NewProduct = typeof productsTable.$inferInsert;

export class ProductService {
  public async count() {
    try {
      const result = await db.select({ count: count() }).from(productsTable);
      return result[0].count;
    } catch (error) {
      console.error("Error al contar productos de la db:", error);
      throw new Error("Ocurrió un error al contar productoscon la db");
    }
  }

  public async findAll(options: FindAllOptionsDto) {
    let result: ProductDto[];
    try {
      let query = db.select().from(productsTable) as any;

      if (options.size !== undefined) {
        query = query.limit(options.size);
      }

      if (options.offset !== undefined) {
        query = query.offset(options.offset);
      }

      if (options.field && options.value) {
        query = query.where(eq(options.field, options.value));
      }

      result = await query;
      return result;
    } catch (error) {
      console.error("Error al recuperar productos de la db: ", error);
      throw new Error("Ocurrió un error al recuperar productos de la db");
    }
  }

  async insert(newProduct: NewProduct) {
    const addedProduct = db.insert(productsTable).values(newProduct);

    return addedProduct;
  }
}
