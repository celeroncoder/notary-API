import { Module } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginController } from "./login.controller";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/users/entities/users.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { JwtStrategy } from "./strategies/jwt.strategies";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([Users]),
        PassportModule.register({ defaultStrategy: "jwt", session: false }),
        JwtModule.register({
            secret: process.env.SECRET_KEY_JWT,
            signOptions: {
                expiresIn: 3600,
            },
        }),
    ],
    controllers: [LoginController],
    providers: [LoginService, UsersService, JwtStrategy],
})
export class LoginModule {}
