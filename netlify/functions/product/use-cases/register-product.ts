import { HandlerResponse } from "@netlify/functions";
import { db } from "../../../data/db";
import { productsTable } from "../../../data/schemas/products.schema";
import { HEADERS } from "../../../config/utils";
import { RegisterProductDto } from "../dtos";


interface RegisterProductUseCase {
    execute(dto: RegisterProductDto): Promise<HandlerResponse>;
}

export class RegisterProduct implements RegisterProductUseCase {

    public async execute(dto: RegisterProductDto): Promise<HandlerResponse> {
        try {

            const product = await db
                .insert(productsTable)
                .values(dto)


            return {
                statusCode: 201,
                body: JSON.stringify({
                    message: "Producto registrado correctamente"
                }),
                headers: HEADERS.json,
            };
        } catch (error) {
            console.error("Error registering product:", error);

            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: "Error registering product",
                }),
                headers: HEADERS.json,
            };
        }

    }
}