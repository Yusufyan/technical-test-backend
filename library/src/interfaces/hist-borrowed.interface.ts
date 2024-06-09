import { IBook } from './books.interface';
import { IMember } from './member.interface';

export interface IHistBorrowed {
  readonly _id: string;
  code: string;
  memberId: string;
  bookId: string;
  status: boolean;
  dateBorrowed: Date;
  dateReturned: Date;
  createdAt: Date;
  updatedAt: Date;
}
