import prisma from "../prisma/prisma";
import { User } from "../models/user.model";
import { Role } from "@prisma/client";
import { mapUserToDTO } from "../dto/user.mapper";
import bcrypt from "bcryptjs";
import { UserDTO } from "../dto/user.dto";


export class UserService {
    async createUser(userClient: User): Promise<UserDTO> {
        try {
            if (!userClient.username || !userClient.password || !userClient.email) {
                throw new Error("All fields are required");
            }

            const hashedPassword = await bcrypt.hash(userClient.password, 10);

            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email: userClient.email },
                        { username: userClient.username },
                    ],
                },
            });

            //   const existingUser = await prisma.$queryRaw`
            //   SELECT id FROM "User"
            //   WHERE email = ${userClient.email} OR username = ${userClient.username}
            //   LIMIT 1;
            // `;


            if (existingUser) {
                throw new Error("User already exists");
            }

            const user = await prisma.user.create({
                data: { ...userClient, password: hashedPassword, role: Role.student , grade: userClient.grade ?? "N/A"}  ,
            });
            
            return mapUserToDTO(user as User);
            
        } catch (error) {
            throw error;
        }
    }

    async login(username: string, password: string): Promise<UserDTO> {
        if (!username || !password) {
            throw new Error("Username and password are required");
        }

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Invalid password");
        }

        return mapUserToDTO(user as User);
    }

    async getUserByUsername(username: string) {
        try {
            if (!username) {
                throw new Error("Username is required");
            }
            const user = await prisma.user.findUnique({
                where: {
                    username: username
                }
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email: string) {
        try {
            if (!email) {
                throw new Error("Email is required");
            }
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