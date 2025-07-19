import { Injectable, NotFoundException } from '@nestjs/common';
import { Gateway } from '@prisma/client';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { Paginate } from '../../interfaces/paginate.interface';
import { PrismaService } from '../../common/prisma/prisma.service';
import { paginate } from '../../utils/paginate.util';

@Injectable()
export class GatewaysService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    const gateway = await this.prismaService.gateway.create({
      data: {
        id: createGatewayDto.id,
        name: createGatewayDto.name,
        type: createGatewayDto.type,
        is_active: true,
      },
    });
    return gateway;
  }

  async findAll(): Promise<Paginate<Gateway>> {
    return await paginate<Gateway>('gateway', this.prismaService, {
      where: {
        is_active: true,
      },
    });
  }

  async findOne(id: string): Promise<Gateway> {
    const gateway = await this.prismaService.gateway.findUnique({
      where: {
        id,
        is_active: true,
      },
    });

    if (!gateway) {
      throw new NotFoundException('Gateway not found');
    }

    return gateway;
  }
}
