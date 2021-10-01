import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";

dotenv.config();

declare const module: any;

(async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
    await app.listen(process.env.PORT || 8080);
})();
