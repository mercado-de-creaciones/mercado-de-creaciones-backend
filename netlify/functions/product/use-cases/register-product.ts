import { HandlerResponse } from "@netlify/functions";
import { HEADERS } from "../../../config/utils";
import { RegisterProductDto } from "../dtos";
import { ProductService } from "../../../services";


interface RegisterProductUseCase {
    execute(dto: RegisterProductDto): Promise<HandlerResponse>;
}

export class RegisterProduct implements RegisterProductUseCase {
    constructor(private readonly productService: ProductService = new ProductService()) {}

    public async execute(dto: RegisterProductDto): Promise<HandlerResponse> {
        try {

            this.productService.insert(dto);

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