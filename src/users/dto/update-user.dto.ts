import { PartialType } from '@nestjs/mapped-types';
import {
  IsMobilePhone,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly first_name?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly last_name?: string;

  @IsOptional()
  @IsMobilePhone()
  @IsString()
  readonly phone_number?: string;
}
