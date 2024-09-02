export class RegisterProductDto {
  private constructor(
    public name: string,
    public price: string,
    public stock: string,
    public size: ProductSize,
    public status: Status,
    public categoryId: number,
    public description?: string,
    public img?: string,
  ) {}


  static create(object: { [key: string]: any }): [string[]?, RegisterProductDto?] {
    const errors: string[] = [];
    const { name, description, img, price, stock, size, status, categoryId } = object;

    if (!name) errors.push("Missing name");
    if (!price || parseFloat(price) <= 0) errors.push("Price must be positive");
    if (!stock || parseInt(stock) < 0) errors.push("Stock must be positive or zero");
    if (!size || !Object.values(ProductSize).includes(size)) errors.push("Invalid size");
    if (!status || !Object.values(Status).includes(status)) errors.push("Invalid status");
    if (!categoryId) errors.push("Missing categoryId");

    if (errors.length > 0) {
      return [errors, undefined];
    }


    return [undefined, new RegisterProductDto(name, price, stock, size, status, categoryId, description, img)];
  }
}

enum ProductSize {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL"
}

enum Status {
  PUBLISHED = "PUBLISHED",
  INACTIVE = "INACTIVE"
}