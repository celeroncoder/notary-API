import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import config from "../config/keys";
import { UserSchema } from "./models/user.schema";
import { UsersService } from "./users.service";

describe("UsersController", () => {
	let controller: UsersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				MongooseModule.forRoot(config.mongoURI),
				MongooseModule.forFeature([
					{ name: "User", schema: UserSchema },
				]),
			],
			providers: [UsersService],
			controllers: [UsersController],
		}).compile();

		controller = module.get<UsersController>(UsersController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
