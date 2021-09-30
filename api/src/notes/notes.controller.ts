import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from "@nestjs/common";
import { NoteDto } from "./data/notes.dto";
import { Note } from "./interfaces/notes.interfaces";
import { NotesService } from "./notes.service";

@Controller("notes")
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Get()
    async findAll(): Promise<Note[]> {
        return this.notesService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id): Promise<Note> {
        return this.notesService.findOne(id);
    }

    @Post()
    async create(@Body() createNoteDto: NoteDto): Promise<Note> {
        return this.notesService.create(createNoteDto);
    }

    @Delete(":id")
    async delete(@Param("id") id): Promise<Note> {
        return this.notesService.delete(id);
    }

    @Put(":id")
    async update(
        @Body() updateNoteDto: NoteDto,
        @Param("id") id,
    ): Promise<Note> {
        return this.notesService.update(id, updateNoteDto);
    }
}
