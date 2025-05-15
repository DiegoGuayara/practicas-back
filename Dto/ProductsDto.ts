export class ProductsDto {
  id_producto?: string;
  name: string;
  price: number;
  description?: string | boolean;

  constructor(name: string, price: number, description?: string | boolean) {
    this.name = name;
    this.price = price;
    this.description = description;
  }
}
