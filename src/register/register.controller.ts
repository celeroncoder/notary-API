import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { RegisterUserDto } from "./dto/register-user.dto";
import { RegisterService } from "./register.service";

@Controller("auth/register")
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}

    @Post()
    public async register(
        @Res() res: Response,
        @Body() registerUserDto: RegisterUserDto,
    ): Promise<unknown> {
        try {
            await this.registerService.register(registerUserDto);

            return res.status(HttpStatus.OK).json({
                message: "user registered successfully!",
                status: HttpStatus.OK,
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error: user registration unsuccessful!",
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}
