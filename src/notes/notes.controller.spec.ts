import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { NoteSchema } from "./models/note.schema";
import { NotesController } from "./notes.controller";
import { NotesService } from "./notes.service";
import { ValidateObjectId } from "./validate-objectId.pipe";
import config from "../config/keys";

describe("NotesController", () => {
	let controller: NotesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				MongooseModule.forFeature([
					{ name: "Note", schema: NoteSchema },
				]),
				MongooseModule.forRoot(config.mongoURI),
				ValidateObjectId,
			],
			controllers: [NotesController],
			providers: [NotesService],
		}).compile();

		controller = module.get<NotesController>(NotesController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
