import { ProductDto } from "./db-product.dto";

export class ProductPaginationDto {
    private constructor(
        public page: number,
        public size: number,
        public products: ProductDto[],
        public hasPrev?: boolean,
        public hasNext?: boolean,
    ) { }

    static create(object: { [key: string]: any }): [string?, ProductPaginationDto?] {
        const { page, size, hasPrev, hasNext, products} = object;


        if (!page || page <= 0) return ["Invalid page number"];
        if (!size || size <= 0) return ["Invalid size"];


        return [undefined, new ProductPaginationDto(page, size, products, hasPrev, hasNext )];
    }
}
