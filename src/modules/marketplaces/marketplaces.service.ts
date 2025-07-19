import { Injectable, NotFoundException } from '@nestjs/common';
import { Marketplace } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateMarketplaceDto } from './dto/create-marketplace.dto';
import { Paginate } from 'src/interfaces/paginate.interface';
import { paginate } from 'src/utils/paginate.util';

@Injectable()
export class MarketplacesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createMarketplaceDto: CreateMarketplaceDto,
  ): Promise<Marketplace> {
    return await this.prismaService.marketplace.create({
      data: {
        ...createMarketplaceDto,
        is_active: true,
      },
      include: {
        parent: true,
      },
    });
  }

  async findAll(): Promise<Paginate<Marketplace>> {
    return await paginate<Marketplace>('marketplace', this.prismaService, {
      where: {
        is_active: true,
      },
      include: {
        parent: true,
      },
    });
  }

  async findOne(id: string): Promise<Marketplace> {
    const marketplace = await this.prismaService.marketplace.findUnique({
      where: {
        id,
        is_active: true,
      },
      include: {
        parent: true,
      },
    });

    if (!marketplace) {
      throw new NotFoundException('Marketplace not found');
    }

    return marketplace;
  }
}
