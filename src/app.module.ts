import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NotesModule } from "./notes/notes.module";
import { MongooseModule } from "@nestjs/mongoose";
import { RateLimiterGuard, RateLimiterModule } from "nestjs-rate-limiter";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import config from "./config/keys";
import { HttpLoggerMiddleWare } from "./middlewares/http-logger.middleware";
import { APP_GUARD } from "@nestjs/core";
import { rateLimiterOptions } from "./config/rate-limiter.config";

@Module({
	imports: [
		NotesModule,
		AuthModule,
		UsersModule,
		MongooseModule.forRoot(config.mongoURI),
		RateLimiterModule.register(rateLimiterOptions),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: RateLimiterGuard,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(HttpLoggerMiddleWare).forRoutes("*");
	}
}
