export type PaginationConfig = {
  page: number;
  limit: number;
};

export type PaginationResult<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};
