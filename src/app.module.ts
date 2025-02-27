import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import 'dotenv/config';

const databaseURL: string = (process.env.DATABASE_URL as string);

@Module({
  imports: [
    MongooseModule.forRoot(databaseURL), 
    BooksModule, 
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
