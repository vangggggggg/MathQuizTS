import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import { User } from "../models/User";

const userService = new UserService();

export class UserController {

    static async createUser(req: Request, res: Response) {
        try {
            const user = await userService.createUser(req.body as User);
            res.status(201).json(user);
        } catch (error) {
            const err = error as Error;  // Ép kiểu về Error
            res.status(400).json({ message: err.message });
        }
    }
    
    static async getUserByEmail(req: Request, res: Response) {
        try {
            const email = req.body.email;
            const user = await userService.getUserByEmail(email);
            res.status(200).json(user);
        } catch (error) {
            const err = error as Error;  // Ép kiểu về Error
            res.status(400).json({ message: err.message });
        }
    }
    
    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            const err = error as Error;  // Ép kiểu về Error
            res.status(400).json({ message: err.message });
        }
    }
}