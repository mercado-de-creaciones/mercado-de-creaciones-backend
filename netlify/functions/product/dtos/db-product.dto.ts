export class ProductDto {
    private constructor(
        public id: Number,
        public name: string,
        public price: string,
        public stock: string,
        public size: string,
        public status: string,
        public categoryId: number,
        public description?: string | null,
        public img?: string | null,
    ) { }

}
