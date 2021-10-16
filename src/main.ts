import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import compression from "compression";
import { ValidationPipe } from "@nestjs/common";
import { globalValidationPipeOptions } from "./config/validation-pipe";
import { useContainer } from "class-validator";
import { RequestGuard, ExceptionFilter } from "@libs/core";

declare const module: any;

(async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.enableCors();
    app.use(helmet());
    app.use(compression());

    // guards
    app.useGlobalGuards(new RequestGuard());

    // filters
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionFilter(httpAdapter));

    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe(globalValidationPipeOptions));

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    await app.listen(process.env.PORT || 8080);
})();
