import { HealthStatus } from '../enums/health-status.enum';

export interface Health {
  status: HealthStatus;
  version: string;
  database: HealthDatabase;
}

export interface HealthDatabase {
  status: HealthStatus;
  message?: string;
}
