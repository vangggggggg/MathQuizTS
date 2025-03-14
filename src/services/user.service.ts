import prisma from "../prisma/prisma";
import { User } from "../models/User";

export class UserService {
    async createUser(userClient: User) {
        try {
            const user = await prisma.user.create({
                data: {
                    username: userClient.username,
                    password: userClient.password,
                    email: userClient.email,
                    role: userClient.role
                }
            });
            return user;
        } catch (error) {
            throw error;
        }
    }
    async getUserByEmail(email: string) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            throw error;
        }
    }

}