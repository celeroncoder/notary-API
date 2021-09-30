import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';

@Module({
    imports: [NotesModule, MongooseModule.forRoot(config.mongoURI)],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
