import { HandlerResponse } from "@netlify/functions";
import { productsTable } from "../../../data/schemas/products.schema";
import { HEADERS } from "../../../config/utils";
import { CategoryService, ProductService } from "../../../services";
import { FindAllOptionsDto } from "../dtos/findAll-options.dto";


interface RecentProductsByCategoryUseCase {
    execute(): Promise<HandlerResponse>;
}

export class RecentProductsByCategory implements RecentProductsByCategoryUseCase {
    constructor(
        private readonly productService: ProductService = new ProductService(),
        private readonly categoryService: CategoryService = new CategoryService()) {}


    public async execute(): Promise<HandlerResponse> {
        let categories = await this.categoryService.findAll();

        categories.filter((category) => category.active === true);
        
        const promises = categories.map(async (currentCategory) => {
            let options = new FindAllOptionsDto(1, 0, currentCategory.id, productsTable.categoryId );
            let product = await this.productService.findAll(options);
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