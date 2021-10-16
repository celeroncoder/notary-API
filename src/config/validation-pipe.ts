import { ValidationPipeOptions } from "@nestjs/common";

export const globalValidationPipeOptions: ValidationPipeOptions = {
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
        enableImplicitConversion: true,
    },
};
