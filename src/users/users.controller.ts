import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
} from "@nestjs/common";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { CreateUserDto } from "./data/user.create.dto";
import { UpdateUserDto } from "./data/user.update.dto";
import { User } from "./interfaces/users.interface";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    login(@Request() req): User {
        return req.user;
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(":username")
    async findOne(@Param("username") username: string): Promise<User> {
        const user = await this.userService.findOne(username);
        if (user) {
            return user;
        } else throw new BadRequestException({ message: "user not found!" });
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Delete(":username")
    async delete(@Param("username") username: string): Promise<User> {
        return this.userService.delete(username);
    }

    @UseGuards(LocalAuthGuard)
    @Put(":username")
    async update(
        @Body() updateUserDto: UpdateUserDto,
        @Param("username") username: string,
    ): Promise<User> {
        return this.userService.update(username, updateUserDto);
    }
}
