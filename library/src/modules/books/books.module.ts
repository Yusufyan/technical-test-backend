import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/entities/book.entity';
import { BookService } from './services/book.service';
import { BookCommand } from './commands/book.command';
import { HistBorrowEntity } from 'src/entities/hist-borrowed.entity';
import { BookController } from './controllers/book.controller';
import { HistoryService } from './services/history.service';
import { MembersModule } from '../members/members.module';
import { BookApplication } from './applications/book-crud.application';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity, HistBorrowEntity]),
    MembersModule,
  ],
  controllers: [BookController],
  providers: [BookService, BookCommand, HistoryService, BookApplication],
})
export class BooksModule {}
