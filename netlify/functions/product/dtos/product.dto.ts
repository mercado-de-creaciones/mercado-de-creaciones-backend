
export class RegisterProductDto {
  private constructor(
    public name: string,
    public price: string,
    public stock: string,
    public size: string,
    public status: string,
    public categoryId: number,
    public description?: string,
    public img?: string,
  ) {}


  static create(object: { [key: string]: any }): [string?, RegisterProductDto?] {
    const { name, description, img, price, stock, size, status, categoryId } = object;

    if (!name) return ["Missing name"];
    if (!price) return ["Missing price"];
    if (!stock) return ["Missing stock"];
    if (!size) return ["Missing size"];
    if (!status) return ["Missing status"];
    if (!categoryId) return ["Missing categoryId"];


    return [undefined, new RegisterProductDto(name, price, stock, size, status, categoryId, description, img)];
  }
}
