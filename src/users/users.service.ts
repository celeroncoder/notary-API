import { Injectable } from "@nestjs/common";
import { User } from "./interfaces/users.interface";

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            name: "1",
            username: "meth",
            password: "lala",
        },
        {
            id: 1,
            name: "1",
            username: "meth",
            password: "lala",
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find((user) => user.username === username);
    }
}
