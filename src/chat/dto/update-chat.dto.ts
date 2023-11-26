import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chat.dto';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateChatDto extends PartialType(CreateChatDto) {
  //   participants?: number[];
  //   chatMessage?: number[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsArray()
  participants?: number[];

  @IsOptional()
  @IsArray()
  chatMessage?: number[];
}
