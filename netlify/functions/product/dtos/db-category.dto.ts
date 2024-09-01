import { ProductDto } from "./db-product.dto";

export class CategoryDto {
    public constructor(
        public id: Number,
        public name: string,
        public products: ProductDto[],
        public active?: boolean,
    ) { }

}