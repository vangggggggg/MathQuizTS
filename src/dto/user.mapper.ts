import { User } from "../models/user.model";
import { UserDTO } from "../dto/user.dto";

export function mapUserToDTO(user: User): UserDTO {
    return {
        email: user.email,
        grade: user.grade
    };
}
