import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Gateway, GatewayType } from '../../../enums/getaway.enum';

export class CreateGatewayDto {
  @IsEnum(Gateway)
  @IsNotEmpty()
  @ApiProperty()
  id: Gateway;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEnum(GatewayType)
  @IsNotEmpty()
  @ApiProperty()
  type: GatewayType;
}
