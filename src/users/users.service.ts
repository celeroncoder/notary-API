import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { UserProfileDto } from "./dto/user-profile.dto";
import { UserDto } from "./dto/user.dto";
import { Users } from "./entities/users.entity";
import { IUsers } from "./interfaces/users.interface";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) {}

    public async findByEmail(email: string): Promise<Users> {
        const user = await this.userRepository.findOne({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new NotFoundException(`User ${email} not found`);
        }

        return user;
    }

    public async findById(userId: string): Promise<Users> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new NotFoundException(`User #${userId} not found`);
        }

        return user;
    }

    public async create(userDto: UserDto): Promise<IUsers> {
        try {
            return await this.userRepository.save(userDto);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    public async updateByEmail(email: string): Promise<Users> {
        try {
            const user = await this.userRepository.findOne({ email: email });
            user.password = bcrypt.hashSync(
                Math.random().toString(36).slice(-8),
                8,
            );

            return await this.userRepository.save(user);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    public async updateByPassword(
        email: string,
        password: string,
    ): Promise<Users> {
        try {
            const user = await this.userRepository.findOne({ email: email });
            user.password = bcrypt.hashSync(password, 8);

            return await this.userRepository.save(user);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    public async updateProfileUser(
        userId: string,
        userProfileDto: UserProfileDto,
    ): Promise<Users> {
        try {
            // TODO: figure out what is +id
            const user = await this.userRepository.findOne({ id: +userId });
            user.name = userProfileDto.name;
            user.email = userProfileDto.email;
            user.username = userProfileDto.username;

            return await this.userRepository.save(user);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
