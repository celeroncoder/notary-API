import {
    Controller,
    Get,
    NotFoundException,
    Param,
    Put,
    UseGuards,
    Body,
    Res,
    HttpStatus,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { UserProfileDto } from "./dto/user-profile.dto";
import { IUsers } from "./interfaces/users.interface";
import { UsersService } from "./users.service";

@UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get("/:userId/profile")
    public async getUser(@Param("userId") userId: string): Promise<IUsers> {
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new NotFoundException("User does not exist!");
        }

        return user;
    }

    @Put("/:userId/profile")
    public async updateUserProfileUser(
        @Res() res: Response,
        @Param("userId") userId: string,
        @Body() userProfileDto: UserProfileDto,
    ): Promise<any> {
        try {
            await this.userService.updateProfileUser(userId, userProfileDto);

            return res.status(HttpStatus.OK).json({
                message: "user updated successfully!",
                status: 200,
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error: user not updated!",
                status: HttpStatus.BAD_REQUEST,
            });
        }
    }
}
