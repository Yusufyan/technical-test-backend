import { IBook } from './books.interface';

export interface IMember {
  readonly _id: string;
  code: string;
  name: string;
  isPenalized: boolean;
  endOfPenalized: Date;
  createdAt: Date;
  updatedAt: Date;
}
