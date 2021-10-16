import { Module } from "@nestjs/common";
import { ForgotPasswordService } from "./forgot-password.service";
import { ForgotPasswordController } from "./forgot-password.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/users/entities/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [ForgotPasswordController],
    providers: [ForgotPasswordService],
})
export class ForgotPasswordModule {}
