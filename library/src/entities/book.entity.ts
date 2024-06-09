import { IBook } from 'src/interfaces/books.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mst_books')
export class BookEntity implements IBook {
  @PrimaryGeneratedColumn('uuid')
  readonly _id: string;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'author' })
  author: string;

  @Column({ name: 'stock' })
  stock: number;

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
