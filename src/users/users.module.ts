import { Module } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./models/user.schema";

@Module({
    imports: [
        UsersModule,
        MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    ],
    exports: [UsersService],
    providers: [UsersService, AuthService],
    controllers: [UsersController],
})
export class UsersModule {}
