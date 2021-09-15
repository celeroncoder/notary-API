import mongoose from "mongoose";

interface INote {
    title: string;
    body: string;
}

interface NoteModel extends mongoose.Model<NoteDoc> {
    build(attr: INote): NoteDoc;
}

interface NoteDoc extends mongoose.Document {
    title: string;
    body: string;
}

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

const Note = mongoose.model<NoteDoc, NoteModel>('Note', NoteSchema);

NoteSchema.statics.build =  (note: INote) => {
    return new Note(note);
}

export default Note;
