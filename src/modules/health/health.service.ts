import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { APP_CONFIG } from '../../config/app.config';
import { HealthStatus } from '../../enums/health-status.enum';
import { Health, HealthDatabase } from '../../interfaces/health.interface';

@Injectable()
export class HealthService {
  constructor(private readonly prismaService: PrismaService) {}

  async checkHealth(): Promise<Health> {
    const databaseConnection = await this.checkDatabaseConnection();
    const status = this.parseStatus(databaseConnection.status);
    return {
      status,
      version: APP_CONFIG.version,
      database: databaseConnection,
    };
  }

  private parseStatus(status: HealthStatus): HealthStatus {
    return status === HealthStatus.UP ? HealthStatus.OK : HealthStatus.DEGRADED;
  }

  private async checkDatabaseConnection(): Promise<HealthDatabase> {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return { status: HealthStatus.UP };
    } catch {
      return {
        status: HealthStatus.DOWN,
        message: 'Database connection failed',
      };
    }
  }
}
