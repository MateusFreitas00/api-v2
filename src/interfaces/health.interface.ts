import { HealthStatus } from '../enums/health.enum';

export interface Health {
  status: HealthStatus;
  version: string;
  database: HealthDatabase;
}

export interface HealthDatabase {
  status: HealthStatus;
  message?: string;
}
