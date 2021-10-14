import { Module } from "@nestjs/common";
import { RegisterService } from "./register.service";
import { RegisterController } from "./register.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/users/entities/users.entity";
import { UsersService } from "src/users/users.service";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [RegisterController],
    providers: [RegisterService, UsersService],
})
export class RegisterModule {}
