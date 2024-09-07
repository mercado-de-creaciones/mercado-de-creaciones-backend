import { db } from "../data/db";
import { categoriesTable } from "../data/schemas/categories.schema";
import { CategoryDto } from "../functions/product/dtos/db-category.dto";

type NewCategory = typeof categoriesTable.$inferInsert;

export class CategoryService {
  public async findAll(size?: number, offset?: number) {
    let result: CategoryDto[];
    try {
      let query = db.select().from(categoriesTable) as any;

      if (size !== undefined) {
        query = query.limit(size);
      }

      if (offset !== undefined) {
        query = query.offset(offset);
      }

      result = await query;
      return result;
    } catch (error) {
      console.error("Error al recuperar productos de la db: ", error);
      throw new Error("Ocurrió un error al recuperar productos de la db");
    }
  }

  async insert(newCategory: NewCategory) {
    const addedCategory = db.insert(categoriesTable).values(newCategory);

    return addedCategory;
  }
}
