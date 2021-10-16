import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as helmet from "helmet";
import * as compression from "compression";
import { ValidationPipe } from "@nestjs/common";
import { globalValidationPipeOptions } from "./config/validation-pipe";

declare const module: any;

(async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(helmet());
	app.use(compression());

    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe(globalValidationPipeOptions));

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    await app.listen(process.env.PORT || 8080);
})();
