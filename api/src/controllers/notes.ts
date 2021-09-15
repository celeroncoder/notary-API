import { Request, Response } from "express";

import Note from "../models/Note";
import logger from "../utils/logger";

async function createNote(req: Request, res: Response) {
    const { title, body } = req.body;
    
    const note = Note.build({ title, body });
    await note.save().then(() => { return res.status(201).json(note) })
        .catch(err => {
            logger.error(err);
            return res.status(400).json({"status": "failed", "message": "Bad Request"})
        });
}

async function getAllNotes(req: Request, res: Response) {
    const notes = await Note.find({});
    return res.status(200).json(notes);
}

export { createNote, getAllNotes };
