import pool from "../config/db-config";
import { UserDto } from "../Dto/UserDto";
import bcrypt from "bcryptjs";

export class UserRepository {
  static async createUser(user: UserDto) {
    const hashedPassword = await bcrypt.hash(user.password!, 10);
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    const values = [user.name, user.email, hashedPassword];

    const [resultDb]: any = await pool.query(query, values);

    return {
      ...user,
      id: resultDb.insertId,
    };
  }

  static async findByEmail(email: string) {
    const query = `SELECT * FROM users WHERE email = ?`;
    const values = [email];

    const [rows]: any = await pool.query(query, values);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }
}
