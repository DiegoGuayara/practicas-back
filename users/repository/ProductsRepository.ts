import pool from "../config/db-config";
import { ProductsDto } from "../Dto/ProductsDto";

export class ProductsRepository {
  static async createProduct(product: ProductsDto) {
    const query =
      "INSERT INTO products (name, description, price) VALUES (?, ?, ?)";

    const values = [product.name, product.description, product.price];

    const [resultDb]: any = pool.query(query, values);

    return {
      ...product,
      id: resultDb.insertId,
    };
  }

  static async findByDescription(description: string) {
    const query = "SELECT * FROM products WHERE description = ?";
    const values = [description];

    const [rows]: any = pool.query(query, values);

    if (rows.length === 0) {
      return null;
    }

    return rows[0]
  }
}
