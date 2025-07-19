import { PrismaClient } from '@prisma/client';

type PrismaModelClient = {
  findMany: (args: {
    where?: unknown;
    orderBy?: unknown;
    select?: unknown;
    include?: unknown;
    take?: number;
    skip?: number;
  }) => Promise<unknown[]>;
  count: (args: { where?: unknown }) => Promise<number>;
};

interface PaginateOptions {
  where?: unknown;
  orderBy?: unknown;
  select?: unknown;
  include?: unknown;
  limit?: number;
  offset?: number;
}

interface PaginateResult<T> {
  items: T[];
  count: number;
  total: number;
  limit: number;
  offset: number;
}

export async function paginate<T>(
  model: keyof PrismaClient,
  prisma: PrismaClient,
  options: PaginateOptions,
): Promise<PaginateResult<T>> {
  const {
    where,
    orderBy = { id: 'desc' },
    select,
    include,
    limit = 100,
    offset = 0,
  } = options;

  const validatedLimit = Math.min(limit, 100);
  const validatedOffset = Math.max(offset, 0);

  const modelClient = prisma[model] as PrismaModelClient;

  const [items, total] = await Promise.all([
    modelClient.findMany({
      where,
      orderBy,
      select,
      include,
      take: validatedLimit,
      skip: validatedOffset,
    }),
    modelClient.count({ where }),
  ]);

  return {
    items: items as T[],
    count: items.length,
    limit: validatedLimit,
    offset: validatedOffset,
    total,
  };
}
