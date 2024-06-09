import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HistBorrowEntity } from 'src/entities/hist-borrowed.entity';
import { MemberEntity } from 'src/entities/member.entity';
import { IMember } from 'src/interfaces/member.interface';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class MemberApplication {
  constructor(private connection: Connection) {}

  async fetch(): Promise<any> {
    try {
      return await this.connection.transaction(async (entityManager) => {
        const membersWithBooks = await entityManager
          .createQueryBuilder(MemberEntity, 'member')
          .select([
            'member._id',
            'member.code',
            'member.name',
            'member.is_penalized',
            'member.end_of_penalized',
          ])
          .getMany();

        const borrowedBooksCounts = await entityManager
          .createQueryBuilder(HistBorrowEntity, 'borrow')
          .select('borrow.member_id', 'memberId')
          .addSelect('COUNT(borrow._id)', 'count')
          .where('borrow.status = :status', { status: true })
          .groupBy('borrow.member_id')
          .getRawMany();

        const borrowedBooksCountMap = borrowedBooksCounts.reduce(
          (acc, item) => {
            acc[item.memberId] = parseInt(item.count, 10);
            return acc;
          },
          {},
        );

        membersWithBooks.forEach((member: any) => {
          member.borrowed_books = borrowedBooksCountMap[member._id] || 0;
        });

        return membersWithBooks;
      });
    } catch (err) {
      console.log(err?.message);

      throw new InternalServerErrorException('Something went wrong.');
    }
  }
}
