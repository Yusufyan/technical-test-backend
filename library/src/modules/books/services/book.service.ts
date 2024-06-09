import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/entities/book.entity';
import { IBook } from 'src/interfaces/books.interface';
import { MoreThan, Repository } from 'typeorm';
import { CreateBookDTO } from '../dto/request.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async create(body: CreateBookDTO): Promise<IBook> {
    return await this.bookRepository.save(body);
  }

  async findAll(): Promise<IBook[]> {
    return await this.bookRepository.find({
      where: { stock: MoreThan(0) },
    });
  }

  async findByCode(code: string): Promise<IBook> {
    return await this.bookRepository.findOne({
      where: { code: code, stock: MoreThan(0) },
    });
  }

  async findById(id: string): Promise<IBook> {
    return await this.bookRepository.findOne({
      where: { _id: id },
    });
  }
}
