import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class ChangePasswordDto {
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    readonly password: string;
}
