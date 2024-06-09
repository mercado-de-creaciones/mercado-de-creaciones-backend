import { HandlerResponse } from "@netlify/functions";
import { db } from "../../../data/db";
import { productsTable } from "../../../data/schemas/products.schema";
import { desc } from 'drizzle-orm';
import { HEADERS } from "../../../config/utils";
import { RegisterProductDto } from "../dtos/product.dto";
import { log } from "console";
import { RegisterCategoryDto } from "../dtos/category.dto";
import { categoriesTable } from "../../../data/schemas/categories.schema";


interface RegisterCategoryUseCase {
    execute(dto: RegisterCategoryDto): Promise<HandlerResponse>;
}

export class RegisterCategory implements RegisterCategoryUseCase {

    public async execute(dto: RegisterCategoryDto): Promise<HandlerResponse> {
        try {

            const category = await db
                .insert(categoriesTable)
                .values(dto)


            return {
                statusCode: 201,
                body: JSON.stringify({
                    message: "Categoria registrada correctamente"
                }),
                headers: HEADERS.json,
            };
        } catch (error) {
            console.error("Error registering category:", error);

            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: "Error registering category",
                }),
                headers: HEADERS.json,
            };
        }

    }
}