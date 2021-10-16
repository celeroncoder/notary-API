import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { get, omit } from "lodash";

@Injectable()
export class RequestGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        this.bindRequestHelpers(context.switchToHttp().getRequest());
        this.bindResponseHelpers(context.switchToHttp().getResponse());

        return true;
    }

    /**
     * Bind Response Helpers
     * @param response
     */
    bindResponseHelpers(response: Response): void {
        function success(
            data: Record<string, any> | Array<any> | string,
            status = 200,
        ): Response<any, Record<string, any>> {
            return response.status(status).json({
                success: true,
                code: status,
                data: data,
            });
        }

        function error(
            error: Record<string, any> | string,
            status = 401,
        ): Response<any, Record<string, any>> {
            let message = "Something went wrong";
            let errors: any = null;

            if (error instanceof Object) {
                message = error.message;
                errors = error.errors;
            } else {
                message = error;
            }

            return response.status(status).json({
                success: false,
                code: status,
                message: message,
                errors: errors,
            });
        }

        function noContent(): void {
            return response.status(204).end();
        }

        function withMeta(
            data: Record<string, any>,
            status = 200,
        ): Response<any, Record<string, any>> {
            return response.status(status).json({
                success: true,
                code: status,
                data: get(data, "data"),
                meta: omit(data, ["data"]),
            });
        }
    }

    /**
     * Bind Request Helpers
     * @param request
     * @returns Request Object
     */
    bindRequestHelpers(request: any): Request {
        function all(): Record<string, any> {
            const inputs = {
                ...request.query,
                ...request.body,
                ...request.params,
            };

            for (const key in inputs) {
                const value = inputs[key];
                if (typeof value === "string" || value instanceof String) {
                    inputs[key] = value.trim();
                }
            }

            return inputs;
        }

        request.all = all;
        return request;
    }
}
