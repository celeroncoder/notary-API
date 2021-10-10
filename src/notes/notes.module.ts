import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NoteSchema } from "./models/note.schema";
import { NotesController } from "./notes.controller";
import { NotesService } from "./notes.service";
import { ValidateObjectId } from "./validate-objectId.pipe";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "Note", schema: NoteSchema }]),
		ValidateObjectId,
	],
	controllers: [NotesController],
	providers: [NotesService],
})
export class NotesModule {}
