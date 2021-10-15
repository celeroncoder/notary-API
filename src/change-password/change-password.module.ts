import { Module } from "@nestjs/common";
import { ChangePasswordService } from "./change-password.service";
import { ChangePasswordController } from "./change-password.controller";
import { UsersService } from "src/users/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/users/entities/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [ChangePasswordController],
    providers: [ChangePasswordService, UsersService],
})
export class ChangePasswordModule {}
