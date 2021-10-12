import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./interfaces/users.interface";

@Injectable()
export class UsersService {
	constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

	async findAll(): Promise<User[]> {
		return await this.userModel.find();
	}

	async findOne(username: string): Promise<User> {
		return await this.userModel.findOne({ username: { $eq: username } });
	}

	async create(user: User): Promise<User> {
		const newUser = new this.userModel(user);
		return await newUser.save();
	}

	async delete(username: string): Promise<User> {
		return await this.userModel.findOneAndRemove({ username: { $eq: username } });
	}

	async update(username: string, user: User) {
		return await this.userModel.findOneAndUpdate(
			{ username: { $eq: username } },
			user,
			{ new: false },
		);
	}
}
