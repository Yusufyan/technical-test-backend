import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistBorrowEntity } from 'src/entities/hist-borrowed.entity';
import { Repository } from 'typeorm';
import { CreateBorrowedDTO } from '../dto/request.dto';
import { IHistBorrowed } from 'src/interfaces/hist-borrowed.interface';
import { MemberService } from 'src/modules/members/services/member.service';
import { BookService } from './book.service';
import dayjs from 'dayjs';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistBorrowEntity)
    private readonly historyRepository: Repository<HistBorrowEntity>,
    private readonly memberService: MemberService,
    private readonly bookService: BookService,
  ) {}

  async create(body: CreateBorrowedDTO): Promise<any> {
    const member = await this.memberService.findById(body.member);

    if (!member) {
      throw new NotFoundException(`Member not found`, null);
    }

    const book = await this.bookService.findById(body.book);

    if (!book) {
      throw new NotFoundException(`Book not found`, null);
    }

    return await this.historyRepository.save({
      member: member,
      book: book,
      dateBorrowed: dayjs().format('YYYY-MM-DD H:mm:ss'),
    });
  }

  async findAllMember(idMember: string): Promise<IHistBorrowed[]> {
    return await this.historyRepository.find({
      where: { memberId: idMember, status: true },
    });
  }

  async findByCode(code: string): Promise<IHistBorrowed> {
    return await this.historyRepository.findOne({
      where: { code },
      relations: ['book', 'member'],
    });
  }
}
