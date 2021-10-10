import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { NoteSchema } from "./models/note.schema";
import { NotesService } from "./notes.service";
import config from "../config/keys";

describe("NotesService", () => {
	let service: NotesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				MongooseModule.forFeature([
					{ name: "Note", schema: NoteSchema },
				]),
				MongooseModule.forRoot(config.mongoURI),
			],
			providers: [NotesService],
		}).compile();

		service = module.get<NotesService>(NotesService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
