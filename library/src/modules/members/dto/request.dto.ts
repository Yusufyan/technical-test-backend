import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateMemberDTO {
  @IsString()
  code: string;

  @IsString()
  name: string;
}

export class UpdateMemberRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', title: 'name' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', title: 'code' })
  code: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ type: 'boolean', title: 'is penalized' })
  isPenalized: boolean;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: 'string', title: 'end of penalized' })
  endOfPenalized: Date;
}
