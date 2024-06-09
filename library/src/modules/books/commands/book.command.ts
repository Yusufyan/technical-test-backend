import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from 'nestjs-command';
import { BookEntity } from 'src/entities/book.entity';
import { Repository } from 'typeorm';
import { BookService } from '../services/book.service';
import BookSeed from '../seeder/book.seed';

@Injectable()
export class BookCommand {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    private bookService: BookService,
  ) {}

  @Command({
    command: 'seed:book',
    describe: 'create all record for book',
  })
  async create() {
    const books = await this.bookService.findAll();

    if (books.length > 0) {
      await Promise.all(
        BookSeed.map(async (body) => {
          const ifExists = books.some((book) => book.title === body.title);

          if (!ifExists) {
            await this.bookService.create(body);
          }
        }),
      );
    } else {
      await Promise.all(
        BookSeed.map(async (body) => await this.bookService.create(body)),
      );
    }
  }
}
