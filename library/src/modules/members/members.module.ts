import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from 'src/entities/member.entity';
import { MemberService } from './services/member.service';
import { MemberCommand } from './commands/member.command';
import { MemberController } from './controllers/member.controller';
import { MemberApplication } from './applications/member-index.application';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity])],
  controllers: [MemberController],
  providers: [MemberService, MemberCommand, MemberApplication],
  exports: [MemberService],
})
export class MembersModule {}
