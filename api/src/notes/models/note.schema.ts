import * as mongoose from 'mongoose';

export const NoteSchema = new mongoose.Schema({
    name: String,
    body: String,
});
