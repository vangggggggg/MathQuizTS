import { Role } from '../enums/Role';   

export interface User {
    username: string;
    password: string;
    email: string;
    role: Role
    grade: string;
}
