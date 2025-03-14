import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { get } from "http";

const router = Router();

router.post("/create", UserController.createUser);
router.get("/login", UserController.login);
router.get("/all", UserController.getAllUsers);
router.get("/", UserController.getUserByEmail);

export default router;