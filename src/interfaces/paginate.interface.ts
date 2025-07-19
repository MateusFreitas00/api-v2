export interface Paginate<T> {
  items: T[];
  count: number;
  total: number;
  limit: number;
  offset: number;
}
