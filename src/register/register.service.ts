import { Injectable, Logger } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/users/users.service";
import { MailerService } from "@nestjs-modules/mailer";
import { RegisterUserDto } from "./dto/register-user.dto";
import { IUsers } from "src/users/interfaces/users.interface";

@Injectable()
export class RegisterService {
    constructor(
        private readonly usersService: UsersService,
        private readonly mailerService: MailerService,
    ) {}

    public async register(registerUserDto: RegisterUserDto): Promise<IUsers> {
        registerUserDto.password = bcrypt.hashSync(registerUserDto.password, 8);

        return this.usersService.create(registerUserDto);
    }

    private sendMailRegisterUser(user: RegisterUserDto): void {
        this.mailerService
            .sendMail({
                to: user.email,
                from: process.env.ADMIN_EMAIL,
                subject: "Registration Successful 🚀",
                text: "Registration successful!",
                template: "index",
                context: {
                    title: "Registration Successful",
                    description:
                        "You did it! You are now the part of the family.",
                    nameUser: user.name,
                },
            })
            .then((response) => {
                Logger.log(response);
                Logger.log("User Registration: Send mail successfully!");
            })
            .catch((error) => {
                Logger.error(error);
                Logger.error("User Registration: Send mail Failed!");
            });
    }
}
