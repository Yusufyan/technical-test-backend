import { IMember } from 'src/interfaces/member.interface';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from './book.entity';
import { IBook } from 'src/interfaces/books.interface';

@Entity('mst_members')
export class MemberEntity implements IMember {
  @PrimaryGeneratedColumn('uuid')
  readonly _id: string;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'is_penalized' })
  isPenalized: boolean;

  @Column({ name: 'end_of_penalized', nullable: true })
  endOfPenalized: Date;

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
