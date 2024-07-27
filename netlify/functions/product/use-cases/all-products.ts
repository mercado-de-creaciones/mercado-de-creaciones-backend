import { HEADERS } from "../../../config/utils";
import { HandlerResponse } from "@netlify/functions";
import { db } from "../../../data/db";
import { productsTable } from "../../../data/schemas/products.schema";
import { ProductPaginationDto } from "../dtos";
import { count } from 'drizzle-orm';
import { ProductRepository } from "../../../services";



interface AllProductsUseCase {
    execute(queryParams: Object): Promise<HandlerResponse>;
}

export class AllProducts implements AllProductsUseCase {


    productRepository: ProductRepository = new ProductRepository();

    public async execute(queryParams: { [key: string]: any }): Promise<HandlerResponse> {

        let { page = 1, size = 10 } = queryParams;

        
            const totalProducts = await this.productRepository.countProducts();

            if (totalProducts === 0) {
                return {
                    statusCode: 204,
                    headers: HEADERS.json,
                };
            }

            const products = await this.productRepository.getProducts(size, (page - 1) * size);

            const hasPrev = page != 1;
            const hasNext = totalProducts >= size * page;

            const object = {page, size, hasPrev, hasNext, products};

            const [error, productPaginationDto] = ProductPaginationDto.create(object);

            if (error) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error }),
                    headers: HEADERS.json,
                };
            }

            return {
                statusCode: 200,
                body: JSON.stringify({
                    productPaginationDto
                }),
                headers: HEADERS.json,
            };

    }


}