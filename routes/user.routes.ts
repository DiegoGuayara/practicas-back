import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userController = new UserController();
const router = Router();

router.post("/register", UserController.register.bind(userController));


export default router;