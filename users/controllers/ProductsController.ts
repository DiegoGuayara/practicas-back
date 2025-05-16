import { ProductsRepository } from "../repository/ProductsRepository";
import { ProductsDto } from "../Dto/ProductsDto";
import { Request, Response } from "express";

export class ProductsController {
  static async register(req: Request, res: Response) {
    try {
      const { name, description, price } = req.body;

      const existingProduct = await ProductsRepository.findByDescription(
        description
      );

      if (existingProduct) {
        res.status(400).json({
          message: "Product already exists",
        });
        return;
      }

      const newProduct = new ProductsDto(name, description, price);
      const resultDb = await ProductsRepository.createProduct(newProduct);

      res.status(201).json({
        message: "Registration successful",
        product: {
          id: resultDb.id,
          name: resultDb.name,
          description: resultDb.description,
          price: resultDb.price,
        },
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
