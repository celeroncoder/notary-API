import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { UserSchema } from "../users/models/user.schema";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import config from "../config/keys";

describe("AuthService", () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				UsersModule,
				PassportModule,
				MongooseModule.forRoot(config.mongoURI),
				MongooseModule.forFeature([
					{ name: "User", schema: UserSchema },
				]),
			],
			providers: [AuthService, LocalStrategy],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
