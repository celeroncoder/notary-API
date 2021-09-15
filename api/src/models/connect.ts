import logger from "../utils/logger";

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectToDB() {
    const start = new Date().getTime();
    const CONNECTION_URI: string= process.env.MONGO_DB_CONNECTION_URI !== undefined ? process.env.MONGO_DB_CONNECTION_URI : ''; 

    await mongoose.connect(CONNECTION_URI)
    .then(() => {
        const end = new Date().getTime();
        const time = end - start;
        logger.debug(`Connected to DB ${time}ms`);
    })
    .catch(error => logger.error(error));
};

export default connectToDB;
