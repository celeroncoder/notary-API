import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, Logger } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { ChangePasswordDto } from "./dto/change-password.dto";

@Injectable()
export class ChangePasswordService {
    constructor(
        private readonly usersService: UsersService,
        private readonly mailerService: MailerService,
    ) {}

    public async changePassword(changePasswordDto: ChangePasswordDto) {
        return await this.usersService.updateByPassword(
            changePasswordDto.email,
            changePasswordDto.password,
        );
    }

    private sendMailChangePassword(user: any): void {
        this.mailerService
            .sendMail({
                to: user.email,
                from: "from@example.com",
                subject: "Change Password successful ✔",
                text: "Change Password successful!",
                template: "index",
                context: {
                    title: "Change Password successful!",
                    description:
                        "Change Password Successfully! ✔, This is your new password: " +
                        user.password,
                    nameUser: user.name,
                },
            })
            .then((response) => {
                Logger.log(response);
                Logger.log("Change Password: Send Mail successfully!");
            })
            .catch((err) => {
                Logger.error(err);
                Logger.error("Change Password: Send Mail Failed!");
            });
    }
}
