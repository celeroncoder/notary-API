import express, { Express, Request, Response, NextFunction } from "express";
import router from "./routes";
import http from "http";
import httpLogger from "./middlewares/httpLogger";
import logger from "./utils/logger";

const api: Express = express();

api.use(httpLogger);
api.use(express.urlencoded({ extended: false }));
api.use(express.json());

api.use('/', router);

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
