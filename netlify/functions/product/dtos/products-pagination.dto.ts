import { ProductDto } from "./db-product.dto";

export class ProductPaginationDto {
    private constructor(
        public page: Number,
        public size: Number,
        public products: ProductDto[],
        public hasPrev?: boolean,
        public hasNext?: boolean,
    ) { }

    static create(page: Number, size: Number, hasPrev: boolean, hasNext: boolean, products: ProductDto[]): ProductPaginationDto {

        return new ProductPaginationDto(page, size, products, hasPrev, hasNext );
    }
}
