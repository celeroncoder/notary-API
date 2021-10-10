import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Note } from "./interfaces/notes.interfaces";

@Injectable()
export class NotesService {
	constructor(@InjectModel("Note") private readonly noteModel: Model<Note>) {}

	async findAll(): Promise<Note[]> {
		return await this.noteModel.find();
	}

	async findOne(id: string): Promise<Note> {
		return await this.noteModel.findOne({ _id: id });
	}

	async create(note: Note): Promise<Note> {
		const newNote = new this.noteModel(note);
		return await newNote.save();
	}

	async delete(id: string): Promise<Note> {
		return await this.noteModel.findByIdAndRemove(id);
	}

	async update(id: string, note: Note) {
		return await this.noteModel.findByIdAndUpdate(id, note, { new: false });
	}
}
