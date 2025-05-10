import { Request, Response } from "express";
import { UserRepository } from "../repository/UserRepository";
import { UserDto } from "../Dto/UserDto";
import { AuthDto } from "../Dto/AuthDto";

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
}
