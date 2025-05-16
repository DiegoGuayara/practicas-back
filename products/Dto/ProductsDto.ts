export class ProductsDto {
  id_producto?: string;
  name: string;
  description: string;
  price: number;
  codeBar: string;

  constructor(
    name: string,
    description: string,
    price: number,
    codeBar: string
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.codeBar = codeBar;
  }
}
