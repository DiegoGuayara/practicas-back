export class ProductsDto {
  id_producto?: string;
  name: string;
  price: number;
  description?: string;

  constructor(name: string, price: number, description?: string) {
    this.name = name;
    this.price = price;
    this.description = description;
  }
}
