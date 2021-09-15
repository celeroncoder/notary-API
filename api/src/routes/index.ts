import express from "express";
import { 
    createNote,
    getAllNotes
} from "../controllers/notes";

const router= express.Router();

router.get('', (req, res) => {
    res.status(200).json({"status": "success"});
});

router.post('/notes', createNote);
router.get('/notes', getAllNotes);

export default router;
