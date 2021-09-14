import express, { Express } from "express";

const router = express.Router();

router.get('', (req, res) => {
    res.status(200).json({"status": "success"});
});

export default router;
