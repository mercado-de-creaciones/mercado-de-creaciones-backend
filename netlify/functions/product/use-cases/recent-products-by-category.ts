import { HandlerResponse } from "@netlify/functions";
import { db } from "../../../data/db";
import { productsTable } from "../../../data/schemas/products.schema";
import { HEADERS } from "../../../config/utils";
import { categoriesTable } from "../../../data/schemas/categories.schema";
import { eq } from "drizzle-orm";


interface RecentProductsByCategoryUseCase {
    execute(): Promise<HandlerResponse>;
}

export class RecentProductsByCategory implements RecentProductsByCategoryUseCase {

    public async execute(): Promise<HandlerResponse> {
        const categories = await db
            .select()
            .from(categoriesTable);

        categories.filter((category) => category.active === true)

        const promises = categories.map(async (currentCategory) => {
            let product = await db.select().from(productsTable).limit(1).where(eq(productsTable.categoryId, currentCategory.id));
            return { ...currentCategory, products: product, active: true };
        });

        const productsByCategory = await Promise.all(promises);

        return {
            statusCode: 200,
            body: JSON.stringify({
                productsByCategory
            }),
            headers: HEADERS.json,
        };

    }
}