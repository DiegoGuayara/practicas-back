import { Request, Response } from "express";
import { UserRepository } from "../repository/UserRepository";
import { UserDto } from "../Dto/UserDto";
import { AuthDto } from "../Dto/AuthDto";
import generateToken from "../helpers/generateToken";

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const newUser = new UserDto(name, email, password);
      const resultDb = await UserRepository.createUser(newUser);
      res.status(201).json({
        message: "Registration successful",
        user: {
          id: resultDb.id,
          name: resultDb.name,
          email: resultDb.email,
        },
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const authDto = new AuthDto(email, password);
      const user = await UserRepository.findByEmail(authDto.email);

      if (!user) {
        res.status(401).json({ message: "Invalid email" });
        return;
      }

      const validPassword = await UserRepository.verifyPassword(
        authDto.email,
        authDto.password
      );

      if (!validPassword) {
        res.status(401).json({ message: "Invalid password" });
        return;
      }

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const secretKey = "your_secret_key";
      const token = generateToken(payload, secretKey, 60); // Token valid for 60 minutes

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: token,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await UserRepository.findUser();
      if (!users) {
        res.status(404).json({ message: "No users found" });
        return;
      }

      res.status(200).json({
        message: "Users retrieved successfully",
        users: users,
      });
    } catch (error) {
      console.error("Error retrieving users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }
      const user = await UserRepository.findUserById(Number(id));

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({
        message: "User retrieved successfully",
        user: user,
      });
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const camposAct = req.body;

      const columns = [];
      const values = [];

      for (let [key, value] of Object.entries(camposAct)) {
        if (value !== undefined && value !== null && value !== "") {
          columns.push(`${key} = ?`);
          values.push(value);
        }

        if (columns.length === 0) {
          res.status(400).json({ message: "No fields to update" });
          return;
        }

        const sql = `UPDATE users SET ${columns.join(", ")} WHERE id = ?`;
        values.push(id);

        const resultDb = await UserRepository.update(sql, values);

        res.status(200).json({
          message: "User updated successfully",
          user: {
            id: id,
            result: resultDb,
            ...camposAct,
          },
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }

      const resultDb = await UserRepository.delete(Number(id));

      if (resultDb.affectedRows === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({
        message: "User deleted successfully",
        userId: id,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async verifyUser(req: Request, res: Response) {
    try {
      const { id } = req.body;

      res.status(200).json({ status: "Se pudo obtener el usuario", id: id });
    } catch (error) {
      console.log(error);

      res.status(500).json({ errorInfo: "An unknown error has occurred" });
    }
  }

  static async sendEmail(req: Request, res: Response) {
    try {
      const { email, service, password, emailTo, subject, text } = req.body;

      await UserRepository.sendEmail(
        email,
        service,
        password,
        emailTo,
        subject,
        text
      );

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
