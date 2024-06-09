export interface IBook {
  readonly _id: string;
  code: string;
  title: string;
  author: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
