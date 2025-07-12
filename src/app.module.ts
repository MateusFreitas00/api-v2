import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { PrismaService } from './common/prisma/prisma.service';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
