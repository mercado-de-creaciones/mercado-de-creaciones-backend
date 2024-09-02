import { HEADERS } from "../../../config/utils";
import { HandlerResponse } from "@netlify/functions";
import { ProductPaginationDto } from "../dtos";
import { ProductService } from "../../../services";
import { FindAllOptionsDto } from "../dtos/findAll-options.dto";


interface AllProductsUseCase {
    execute(queryParams: Object): Promise<HandlerResponse>;
}

export class AllProducts implements AllProductsUseCase {
    constructor(private readonly productService: ProductService = new ProductService()) {}

    public async execute(queryParams: { [key: string]: any }): Promise<HandlerResponse> {

        let { page = 1, size = 10 } = queryParams;

        
            const totalProducts = await this.productService.count();

            if (totalProducts === 0) {
                return {
                    statusCode: 204,
                    headers: HEADERS.json,
                };
            }

            let options = new FindAllOptionsDto(size, (page- 1) * size);

            const products = await this.productService.findAll(options);

            const hasPrev = page != 1;
            const hasNext = totalProducts >= size * page;

            const object = {page, size, hasPrev, hasNext, products};

            const [, productPaginationDto] = ProductPaginationDto.create(object);

            return {
                statusCode: 200,
                body: JSON.stringify({
                    productPaginationDto
                }),
                headers: HEADERS.json,
            };

    }


}