import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ForgotPasswordService } from "./forgot-password.service";

@Controller("forgot-password")
export class ForgotPasswordController {
    constructor(
        private readonly forgotPasswordService: ForgotPasswordService,
    ) {}

    @Post()
    public async forgotPassword(
        @Res() res: Response,
        @Body() forgotPasswordDto: ForgotPasswordDto,
    ): Promise<any> {
        try {
            await this.forgotPasswordService.forgotPassword(forgotPasswordDto);

            return res.status(HttpStatus.OK).json({
                message: "Request: reset password successfull!",
                status: HttpStatus.OK,
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error: password recovery failed!",
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}
