import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { IBook } from 'src/interfaces/books.interface';
import { IMember } from 'src/interfaces/member.interface';

export class CreateBookDTO {
  @IsString()
  code: string;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNumber()
  stock: number;
}

export class CreateBorrowedDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', title: 'member' })
  member: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', title: 'book' })
  book: string;
}

export class ReturnBookDTO {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    type: 'string',
    title: 'date returned',
    example: '2024-01-01 23:40:40',
  })
  dateReturned: string;
}
