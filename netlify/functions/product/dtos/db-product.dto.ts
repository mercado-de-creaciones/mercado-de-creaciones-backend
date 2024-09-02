export class ProductDto {
    public constructor(
        public id: Number,
        public name: string,
        public price: string,
        public stock: string,
        public size: string,
        public status: string,
        public categoryId: number,
        public createdAt: Date,
        public updatedAt?: Date | null,
        public description?: string | null,
        public img?: string | null,
    ) { }

}
