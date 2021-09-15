import express, { Express, Request, Response, NextFunction } from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import router from "./routes";
import httpLogger from "./middlewares/httpLogger";
import logger from "./utils/logger";
import connectToDB from "./models/connect";

dotenv.config();

const api: Express = express();

api.use(httpLogger);
api.use(express.urlencoded({ extended: false }));
api.use(express.json());
api.use(cors());
api.use(helmet());
api.disable('x-powered-by');
api.set('trust proxy', 1)

api.use('/api/v1', router);

// Connect To DataBase
connectToDB();

// Error Handling
api.use((req:Request, res: Response, next: NextFunction) => {
    const error = new Error('not found!');
    return res.status(404).json({
        message: error.message
    });
});


const httpServer = http.createServer(api);
const PORT: number | string | undefined = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => logger.debug(`The server is running on port ${PORT}`))
