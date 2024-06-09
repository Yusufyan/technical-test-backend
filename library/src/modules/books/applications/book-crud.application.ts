import { MemberService } from 'src/modules/members/services/member.service';
import { BookService } from '../services/book.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBorrowedDTO, ReturnBookDTO } from '../dto/request.dto';
import { Connection } from 'typeorm';
import { HistoryService } from '../services/history.service';
import { BookEntity } from 'src/entities/book.entity';
import { HistBorrowEntity } from 'src/entities/hist-borrowed.entity';
import * as dayjs from 'dayjs';
import { MemberEntity } from 'src/entities/member.entity';

@Injectable()
export class BookApplication {
  constructor(
    private readonly memberService: MemberService,
    private readonly bookService: BookService,
    private readonly historyService: HistoryService,
    private connection: Connection,
  ) {}

  async borrowingBook(body: CreateBorrowedDTO): Promise<any> {
    try {
      return await this.connection.transaction(async (entityManager) => {
        const existHist = await this.historyService.findAllMember(body.member);

        if (existHist.length >= 2) {
          throw new BadRequestException(
            `Member are not allow borrow books more than 2.`,
          );
        }

        const existBook = await this.bookService.findById(body.book);

        if (existBook.stock <= 0) {
          throw new BadRequestException(`Out of stock`);
        }

        const member = await this.memberService.findById(body.member);

        if (
          member.isPenalized &&
          dayjs(member.endOfPenalized).diff(dayjs(), 'day') < 3
        ) {
          throw new BadRequestException('Member is currently under penalty.');
        }

        await entityManager.save(MemberEntity, {
          ...member,
          is_penalized: false,
          end_of_penalized: null,
        });

        const history = await entityManager.save(HistBorrowEntity, {
          code:
            'B-' +
            existBook.code.replaceAll('-', '') +
            dayjs().format('YYYYMMDDHmmss'),
          member: member,
          book: existBook,
          dateBorrowed: dayjs().format('YYYY-MM-DD H:mm:ss'),
        });

        await this.connection.manager.save(BookEntity, {
          ...existBook,
          stock: existBook.stock - 1,
        });

        return history;
      });
    } catch (err) {
      console.log(err.message);
      throw new InternalServerErrorException(
        `Something went wrong, please try again later.`,
      );
    }
  }

  async returned(code: string, body: ReturnBookDTO) {
    try {
      return await this.connection.transaction(async (entityManager) => {
        const borrow = await this.historyService.findByCode(code);

        if (!borrow) {
          throw new NotFoundException(`Borrow code not found`);
        }

        if (!borrow.status) {
          throw new BadRequestException(`That book has been returned`);
        }

        if (dayjs(body.dateReturned).isBefore(dayjs(borrow.dateBorrowed))) {
          throw new BadRequestException(
            `Return date cannot be earlier than borrow date.`,
          );
        }
        const isMoreThan7Days =
          dayjs(body.dateReturned).diff(dayjs(borrow.dateBorrowed), 'day') > 7;

        const existBook = await this.bookService.findById(borrow.bookId);

        await entityManager.save(HistBorrowEntity, {
          ...borrow,
          dateReturned: dayjs(body.dateReturned).format('YYYY-MM-DD H:mm:ss'),
          status: false,
        });

        await this.connection.manager.save(BookEntity, {
          ...existBook,
          stock: existBook.stock + 1,
        });

        if (isMoreThan7Days) {
          await this.memberService.update(borrow.memberId, {
            isPenalized: true,
            endOfPenalized: dayjs().add(3, 'days').toDate(),
          });
        }

        return borrow;
      });
    } catch (err) {
      console.log(err.message);
      throw new InternalServerErrorException(
        `Something went wrong, please try again later.`,
      );
    }
  }
}
