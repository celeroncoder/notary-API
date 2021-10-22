import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import compression from "compression";
import { NestApplicationOptions, ValidationPipe } from "@nestjs/common";
import { globalValidationPipeOptions } from "./config/validation-pipe";
import { useContainer } from "class-validator";
import { RequestGuard, ExceptionFilter, TimeoutInterceptor } from "@libs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

declare const module: any;

(async function bootstrap() {
    const AppOptions: NestApplicationOptions = {
        bodyParser: true,
    };
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        AppOptions,
    );

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.enableCors();
    app.use(helmet());
    app.use(compression());

    // guards
    app.useGlobalGuards(new RequestGuard());

    // filters
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionFilter(httpAdapter));

    // interceptors
    app.useGlobalInterceptors(new TimeoutInterceptor());

    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe(globalValidationPipeOptions));

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    await app.listen(process.env.PORT || 8080);
})();
