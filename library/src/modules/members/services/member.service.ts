import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from 'nestjs-command';
import { MemberEntity } from 'src/entities/member.entity';
import { Repository } from 'typeorm';
import { CreateMemberDTO, UpdateMemberRequest } from '../dto/request.dto';
import { IMember } from 'src/interfaces/member.interface';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private memberRepository: Repository<MemberEntity>,
  ) {}

  async create(body: CreateMemberDTO) {
    return await this.memberRepository.save(body);
  }

  async findAll() {
    return await this.memberRepository.find();
  }

  async findById(id: string) {
    return await this.memberRepository.findOne({
      where: { _id: id },
    });
  }

  async findByCode(code: string) {
    return await this.memberRepository.findOne({
      where: { code },
    });
  }

  async update(
    id: string,
    body: Partial<UpdateMemberRequest>,
  ): Promise<IMember> {
    return await this.memberRepository.save({
      id: id,
      ...body,
      updated_at: new Date(),
    });
  }
}
