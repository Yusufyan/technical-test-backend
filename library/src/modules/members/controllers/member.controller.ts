import { Controller, Get } from '@nestjs/common';
import { MemberApplication } from '../applications/member-index.application';
import { ApiTags } from '@nestjs/swagger';

@Controller('member')
@ApiTags('Member')
export class MemberController {
  constructor(private memberApplication: MemberApplication) {}

  @Get()
  async fetch(): Promise<any> {
    const response = await this.memberApplication.fetch();

    return {
      message: 'Success',
      data: response,
    };
  }
}
