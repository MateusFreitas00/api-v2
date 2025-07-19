import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Gateway } from '@prisma/client';
import { GatewaysService } from './gateways.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { Paginate } from '../../interfaces/paginate.interface';

@Controller()
export class GatewaysController {
  constructor(private readonly gatewaysService: GatewaysService) {}

  @Post('admin/gateways')
  create(@Body() createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    return this.gatewaysService.create(createGatewayDto);
  }

  @Get('admin/gateways')
  findAll(): Promise<Paginate<Gateway>> {
    return this.gatewaysService.findAll();
  }

  @Get('admin/gateways/:id')
  findOne(@Param('id') id: string): Promise<Gateway> {
    return this.gatewaysService.findOne(id);
  }
}
