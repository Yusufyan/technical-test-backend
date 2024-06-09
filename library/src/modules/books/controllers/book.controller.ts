import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { CreateBorrowedDTO, ReturnBookDTO } from '../dto/request.dto';
import { HistoryService } from '../services/history.service';
import { ApiTags } from '@nestjs/swagger';
import { IHistBorrowed } from 'src/interfaces/hist-borrowed.interface';
import { BookApplication } from '../applications/book-crud.application';

@Controller('book')
@ApiTags('Books')
export class BookController {
  constructor(
    private bookApplication: BookApplication,
    private bookService: BookService,
  ) {}

  @Post('/borrow')
  async borrow(@Body() body: CreateBorrowedDTO): Promise<any> {
    const response = await this.bookApplication.borrowingBook(body);

    return {
      message: `Success`,
      data: response,
    };
  }

  @Put('/return/:borrow_code')
  async returned(
    @Param('borrow_code') param: string,
    @Body() body: ReturnBookDTO,
  ): Promise<any> {
    const response = await this.bookApplication.returned(param, body);

    return {
      message: 'Success',
      data: response,
    };
  }

  @Get()
  async fetch(): Promise<any> {
    const response = await this.bookService.findAll();

    return {
      message: 'Success',
      data: response,
    };
  }
}
