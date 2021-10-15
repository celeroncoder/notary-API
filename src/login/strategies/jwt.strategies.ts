import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { LoginService } from "../login.service";
import { Strategy, ExtractJwt } from "passport-jwt";
import { IJwtPayload } from "../interfaces/jwt.payload";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly loginService: LoginService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY_JWT,
        });
    }

    async validate(payload: IJwtPayload): Promise<{
        expiresIn: number;
        token: string;
    }> {
        const user = await this.loginService.validateUserByJwt(payload);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
