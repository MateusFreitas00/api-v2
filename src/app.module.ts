import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { PrismaService } from './common/prisma/prisma.service';
import { HealthModule } from './modules/health/health.module';
import { EventsModule } from './modules/events/events.module';
import { GatewaysModule } from './modules/gateways/gateways.module';
import { MarketplacesModule } from './modules/marketplaces/marketplaces.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    HealthModule,
    EventsModule,
    GatewaysModule,
    MarketplacesModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
