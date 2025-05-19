import { ProductsController } from "../controllers/ProductsController";
import { Router } from "express";

const productsController = new ProductsController();
const router = Router();

router.post("/register", ProductsController.register.bind(productsController));
router.get(
  "/getProducts",
  ProductsController.getProducts.bind(productsController)
);
router.delete(
  "/deleteProduct",
  ProductsController.deleteProduct.bind(productsController)
);

export default router;
