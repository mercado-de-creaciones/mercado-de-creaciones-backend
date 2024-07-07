import { HEADERS } from "../../../config/utils";
import { HandlerResponse } from "@netlify/functions";
import { db } from "../../../data/db";
import { productsTable } from "../../../data/schemas/products.schema";
import { ProductPaginationDto } from "../dtos";
import { count } from 'drizzle-orm';



interface AllProductsUseCase {
    execute(queryParams: Object): Promise<HandlerResponse>;
}

export class AllProducts implements AllProductsUseCase {

    public async execute(queryParams: { [key: string]: any }): Promise<HandlerResponse> {

        let { page = 1, size = 10 } = queryParams;

        const totalProducts = (await db.select({ count: count() }).from(productsTable))[0].count;

        const products = await db
            .select()
            .from(productsTable)
            .limit(size)
            .offset((page - 1) * size);
            
        const hasPrev = page != 1;
        const hasNext = totalProducts >= size * page;
        
        const response = ProductPaginationDto.create(page, size, hasPrev, hasNext, products);


        return {
            statusCode: 400,
            body: JSON.stringify({
                response
            }),
            headers: HEADERS.json,
        };
            
    }


}