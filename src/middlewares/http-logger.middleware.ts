import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class HttpLoggerMiddleWare implements NestMiddleware {
    private logger: Logger = new Logger("Http");

    use(req: Request, res: Response, next: NextFunction): void {
        const { method, originalUrl } = req;
        const userAgent: string = req.get("user-agent") || "";

        res.on("finish", () => {
            const { statusCode } = res;
            const contentLength: string = res.get("content-length");

            this.logger.debug(
                `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent}`,
            );
        });

        next();
    }
}
