import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userController = new UserController();
const router = Router();

router.post("/register", UserController.register.bind(userController));
router.post("/login", UserController.login.bind(userController));
router.get("/getUser", UserController.getUsers.bind(userController));
router.get("/getUser/:id", UserController.getUserById.bind(userController));


export default router;