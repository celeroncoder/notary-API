import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import config from "../config/keys"
import { UserSchema } from "./models/user.schema";
import { MongooseModule } from "@nestjs/mongoose";

describe("UsersService", () => {
	let service: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				MongooseModule.forRoot(config.mongoURI),
				MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
			],
			providers: [UsersService],
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
