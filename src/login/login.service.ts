import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { IJwtPayload } from "./interfaces/jwt.payload";
import { IUsers } from "src/users/interfaces/users.interface";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class LoginService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    private async validate(loginDto: LoginDto): Promise<IUsers> {
        return this.usersService.findByEmail(loginDto.email);
    }

    public async login(
        loginDto: LoginDto,
    ): Promise<any | { status: number; message: string }> {
        return this.validate(loginDto).then((userData) => {
            if (!userData) {
                throw new UnauthorizedException();
            }

            const passwordIsValid = bcrypt.compareSync(
                loginDto.password,
                userData.password,
            );

            if (!passwordIsValid == true) {
                return {
                    message: "Authentication failed!",
                    status: 400,
                };
            }

            const payload = {
                name: userData.name,
                email: userData.email,
                id: userData.id,
            };

            const accessToken = this.jwtService.sign(payload);

            return {
                expiresIn: 3600,
                accessToken: accessToken,
                user: payload,
                status: 200,
            };
        });
    }

    public async validateUserByJwt(payload: IJwtPayload) {
        const user = await this.usersService.findByEmail(payload.email);

        if (!user) {
            throw new UnauthorizedException();
        }

        return this.createJwtPayload(user);
    }

    protected createJwtPayload(user: IUsers) {
        const data: IJwtPayload = {
            email: user.email,
        };

        const jwt: string = this.jwtService.sign(data);

        return {
            expiresIn: 3600,
            token: jwt,
        };
    }
}
