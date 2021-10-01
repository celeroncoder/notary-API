import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { User } from "./interfaces/users.interface";

@Controller("users")
export class UsersController {
    @UseGuards(LocalAuthGuard)
    @Post("login")
    login(@Request() req): User {
        return req.user;
    }
}
