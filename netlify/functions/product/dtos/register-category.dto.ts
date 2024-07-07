import { ProductDto } from "./db-product.dto";

export class RegisterCategoryDto {
    private constructor(
        public name: string,
        public products: ProductDto[],
        public active?: boolean,
    ) { }


    static create(object: { [key: string]: any }): [string?, RegisterCategoryDto?] {
        const { name, active } = object;

        if (!name) return ["Missing name"];


        return [undefined, new RegisterCategoryDto(name, [], active)];
    }
}
