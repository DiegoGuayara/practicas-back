import { ProductsRepository } from "../repository/ProductsRepository";
import { ProductsDto } from "../Dto/ProductsDto";
import { Request, Response } from "express";

export class ProductsController {
  static async register(req: Request, res: Response) {
    try {
      const { name, description, price, codeBar } = req.body;

      if (!description || description.trim() === "") {
        res.status(400).json({
          message: "Description is required",
        });
        return;
      }

      const existingProduct = await ProductsRepository.findByDescriptionAndName(description, name);

      if (existingProduct) {
        res.status(400).json({
          message: "Product already exists",
        });
        return;
      }

      const newProduct = new ProductsDto(name, description, price, codeBar);
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

  static async getProducts(req: Request, res: Response) {
    try {
      const products = await ProductsRepository.getProducts();

      if (!products) {
        res.status(404).json({
          message: "No products found",
        });
        return;
      }

      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
