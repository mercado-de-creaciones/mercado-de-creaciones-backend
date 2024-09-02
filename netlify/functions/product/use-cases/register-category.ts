import { HandlerResponse } from "@netlify/functions";
import { HEADERS } from "../../../config/utils";
import { RegisterCategoryDto } from "../dtos";
import { CategoryService } from "../../../services";


interface RegisterCategoryUseCase {
    execute(dto: RegisterCategoryDto): Promise<HandlerResponse>;
}

export class RegisterCategory implements RegisterCategoryUseCase {
    constructor(private readonly categoryService: CategoryService = new CategoryService()) {}


    public async execute(dto: RegisterCategoryDto): Promise<HandlerResponse> {
        try {

            await this.categoryService.insert(dto);

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