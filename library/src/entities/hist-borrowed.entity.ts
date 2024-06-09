import { IHistBorrowed } from 'src/interfaces/hist-borrowed.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MemberEntity } from './member.entity';
import { IMember } from 'src/interfaces/member.interface';
import { BookEntity } from './book.entity';
import { IBook } from 'src/interfaces/books.interface';

@Entity('history_borrowed')
export class HistBorrowEntity implements IHistBorrowed {
  @PrimaryGeneratedColumn('uuid')
  readonly _id: string;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'member_id' })
  memberId: string;

  @Column({ name: 'book_id' })
  bookId: string;

  @ManyToOne(() => MemberEntity, (member) => member._id, { nullable: false })
  @JoinColumn({ name: 'member_id' })
  member: IMember;

  @ManyToOne(() => BookEntity, (book) => book._id, { nullable: false })
  @JoinColumn({ name: 'book_id' })
  book: IBook;

  @Column({ name: 'status', default: true })
  status: boolean;

  @Column({ name: 'date_borrowed' })
  dateBorrowed: Date;

  @Column({ name: 'date_returned', nullable: true })
  dateReturned: Date;

  @Column({
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
