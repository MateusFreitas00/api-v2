import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Marketplace } from '@prisma/client';
import { MarketplacesService } from './marketplaces.service';
import { CreateMarketplaceDto } from './dto/create-marketplace.dto';
import { Paginate } from '../../interfaces/paginate.interface';

@Controller()
export class MarketplacesController {
  constructor(private readonly marketplacesService: MarketplacesService) {}

  @Post('admin/marketplaces')
  create(
    @Body() createMarketplaceDto: CreateMarketplaceDto,
  ): Promise<Marketplace> {
    return this.marketplacesService.create(createMarketplaceDto);
  }

  @Get('admin/marketplaces')
  findAll(): Promise<Paginate<Marketplace>> {
    return this.marketplacesService.findAll();
  }

  @Get('admin/marketplaces/:id')
  findOne(@Param('id') id: string): Promise<Marketplace> {
    return this.marketplacesService.findOne(id);
  }
}
