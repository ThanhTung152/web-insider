export interface IResponseAxios<T> {
  total?: number;
  data: T[];
  page?: number;
  perPage?: number;
}
