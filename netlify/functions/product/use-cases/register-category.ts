import { HandlerResponse } from "@netlify/functions";
import { db } from "../../../data/db";
import { HEADERS } from "../../../config/utils";
import { RegisterCategoryDto } from "../dtos";
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