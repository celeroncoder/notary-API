import {
    Catch,
    NotFoundException,
    UnauthorizedException,
    ArgumentsHost,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { BaseExceptionFilter } from "@nestjs/core";
import {
    GenericException,
    InvalidCredentials,
    ModelNotFoundException,
    Unauthorized,
    ValidationFailed,
} from ".";

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
    doNotReport(): typeof NotFoundException[] {
        return [
            NotFoundException,
            ValidationFailed,
            InvalidCredentials,
            GenericException,
            ModelNotFoundException,
            Unauthorized,
            UnauthorizedException,
        ];
    }

    catch(exception: any, host: ArgumentsHost) {
        console.error("ERROR ==> ", exception);
        const context: HttpArgumentsHost = host.switchToHttp();
        const response: any = context.getResponse<any>();

        if (exception instanceof ValidationFailed) {
            return response.error(
                {
                    message: exception.message,
                    errors: exception.getErrors(),
                },
                exception.getStatus(),
            );
        }

        let message: any | string =
            exception.message ||
            "Something went wrong. Please try again later.";

        const status: any | number = exception.status ? exception.status : 500;

        return response.status(status).json({
            success: false,
            code: status,
            message,
        });
    }
}
