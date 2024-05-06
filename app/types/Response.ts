export interface Response<T> {
  header: {
    code: number;
    isSuccess: boolean;
    message: string;
  };
  result?: T;
}
