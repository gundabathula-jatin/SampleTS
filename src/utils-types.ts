export type Mapper<T, R> = (value: T) => R;

export type FetchProducer<T, R extends Response> = Mapper<T, Promise<R>>;

export type User = { name: string; id: number; gender: string };
export type UserDto = { userName: string; sno: number; gen: string };
