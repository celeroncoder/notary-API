import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NotesModule } from "./notes/notes.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import config from "./config/keys";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
    imports: [
        NotesModule,
        AuthModule,
        UsersModule,
        MongooseModule.forRoot(config.mongoURI),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
