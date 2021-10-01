import { Injectable } from "@nestjs/common";
import { User } from "src/users/interfaces/users.interface";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async validateUser(
        username: string,
        password: string,
    ): Promise<User | null> {
        const user = await this.userService.findOne(username);

        if (user && user.password === password) {
            const { password, username, ...rest } = user;
            return user;
        }

        return null;
    }
}
