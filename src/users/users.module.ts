import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
    imports: [UsersModule],
    exports: [UsersService],
    providers: [UsersService, AuthService],
    controllers: [UsersController],
})
export class UsersModule {}
