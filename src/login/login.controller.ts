import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { LoginService } from "./login.service";

@Controller("login")
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    public async login(@Body() loginDto: LoginDto): Promise<any> {
        return await this.loginService.login(loginDto);
    }
}
