import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Res,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { ChangePasswordService } from "./change-password.service";
import { ChangePasswordDto } from "./dto/change-password.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("auth/change-password")
export class ChangePasswordController {
    constructor(
        private readonly changePasswordService: ChangePasswordService,
    ) {}

    @Post()
    public async changePassword(
        @Res() res: Response,
        @Body() changePasswordDto: ChangePasswordDto,
    ): Promise<any> {
        try {
            await this.changePasswordService.changePassword(changePasswordDto);

            return res.status(HttpStatus.OK).json({
                message: "changed password successfully!",
                status: HttpStatus.OK,
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error: password change failed!",
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}
