import pool from "../config/db_config";
import { ProductsDto } from "../Dto/ProductsDto";
import bcrypt from "bcryptjs";

export class ProductsRepository {
  static async createProduct(product: ProductsDto) {
    const hashedCodeBar = await bcrypt.hash(product.codeBar, 10);
    const query =
      "INSERT INTO products (name, description, price, codeBar) VALUES (?, ?, ?, ?)";

    const values = [
      product.name,
      product.description,
      product.price,
      hashedCodeBar,
    ];

    const [resultDb]: any = await pool.query(query, values);

    return {
      ...product,
      id: resultDb.insertId,
    };
  }

  static async getProducts() {
    const query = "SELECT * FROM products";
    const [rows]: any = await pool.query(query);

    if (rows.length === 0) {
      return null;
    }

    return rows;
  }

  static async findByDescriptionAndName(description: string, name: string) {
    const query = "SELECT * FROM products WHERE description = ? AND name = ?";
    const values = [description, name];

    const [rows]: any = await pool.query(query, values);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }
}
