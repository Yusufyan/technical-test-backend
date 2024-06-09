import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from 'nestjs-command';
import { MemberEntity } from 'src/entities/member.entity';
import { Repository } from 'typeorm';
import { MemberService } from '../services/member.service';
import MemberSeeder from '../seeder/member.seeder';

@Injectable()
export class MemberCommand {
  constructor(
    @InjectRepository(MemberEntity)
    private memberRepository: Repository<MemberEntity>,
    private memberService: MemberService,
  ) {}

  @Command({
    command: 'seed:member',
    describe: 'create all records for member',
  })
  async create() {
    const members = await this.memberService.findAll();

    if (members.length > 0) {
      await Promise.all(
        MemberSeeder.map(async (body) => {
          const ifExists = members.some((member) => member.name === body.name);

          if (!ifExists) {
            await this.memberService.create(body);
          }
        }),
      );
    } else {
      await Promise.all(
        MemberSeeder.map(async (body) => await this.memberService.create(body)),
      );
    }
  }
}
