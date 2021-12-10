import { Mapper, User } from "./utils-types";

export type FetchRequest<T, R, R1> = {
  uri: string;
  userSerde: Mapper<T, R>;
  transformTo: Mapper<R, R1>;
} & RequestInit;

const transformToJson = async <T = any>(r: Response) => {
  return r
    .json()
    .then<T>((v) => (r.ok ? Promise.resolve(v) : Promise.reject()));
};

export const fetchData = async <T, R, R1>(
  reqOpts: FetchRequest<T, R, R1>
): Promise<R1> => {
  const data = await fetch(reqOpts.uri)
    .then(transformToJson)
    .then(reqOpts.userSerde)
    .then(reqOpts.transformTo);
  return data;
};
