import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hashSync } from "bcrypt";
import { Users } from "src/users/entities/users.entity";
import { Repository } from "typeorm";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";

@Injectable()
export class ForgotPasswordService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,
        private readonly mailerService: MailerService,
    ) {}

    public async forgotPassword(
        forgotPasswordDto: ForgotPasswordDto,
    ): Promise<any> {
        const userUpdate = await this.userRepository.findOne({
            email: forgotPasswordDto.email,
        });

        const passwordRand = Math.random().toString(36).slice(-8);

        userUpdate.password = hashSync(userUpdate.email, passwordRand);

        this.sendMailForgotPassword(userUpdate.email, passwordRand);

        return this.userRepository.save(userUpdate);
    }

    private sendMailForgotPassword(email, password): void {
        this.mailerService
            .sendMail({
                to: email,
                from: process.env.ADMIN_EMAIL,
                subject: "Forgot Password successful ✔",
                text: "Forgot Password successful!",
                template: "index",
                context: {
                    title: "Forgot Password successful!",
                    description:
                        "Request Reset Password Successfully!  ✔, This is your new password: " +
                        password,
                },
            })
            .then((response) => {
                console.log(response);
                console.log("Forgot Password: Send Mail successfully!");
            })
            .catch((err) => {
                console.log(err);
                console.log("Forgot Password: Send Mail Failed!");
            });
    }
}
