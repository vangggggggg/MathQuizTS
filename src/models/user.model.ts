import { Role } from '../enums/role';   

export interface User {
    username: string;
    password: string;
    email: string;
    role: Role
    grade: string;
}
