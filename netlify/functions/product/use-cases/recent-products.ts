import { HandlerResponse } from "@netlify/functions";
import { db } from "../../../data/db";
import { productsTable } from "../../../data/schemas/products.schema";
import { desc } from 'drizzle-orm';
import { HEADERS } from "../../../config/utils";


interface RecentProductsUseCase {
    execute(): Promise<HandlerResponse>;
}

export class RecentProducts implements RecentProductsUseCase {

    public async execute(): Promise<HandlerResponse> {
        const products = await db
            .select()
            .from(productsTable)
            .orderBy(desc(productsTable.createdAt))
            .limit(5);


        return {
            statusCode: 200,
            body: JSON.stringify({
                products
            }),
            headers: HEADERS.json,
        };

    }
}