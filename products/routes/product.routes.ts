import { ProductsController } from "../controllers/ProductsController";
import { Router } from "express";

const productsController = new ProductsController();
const router = Router();

router.post("/register", ProductsController.register.bind(productsController));

export default router;
