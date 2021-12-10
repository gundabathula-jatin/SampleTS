import "./styles.css";
import { fetchData, FetchRequest } from "./utils";
import { Mapper, User, UserDto } from "./utils-types";

export default async function App() {
  const mapper: Mapper<User, UserDto> = (u: User): UserDto => {
    return { userName: u.name, sno: u.id, gen: u.gender };
  };

  type jsonSchema = {
    meta: any;
    data: Array<User>;
  };
  const jsonSerde: Mapper<jsonSchema, User> = (i) => {
    return { name: i.data[0].name, id: i.data[0].id, gender: i.data[0].gender };
  };

  const inputs: FetchRequest<jsonSchema, User, UserDto> = {
    uri: "https://gorest.co.in/public/v1/users?id=6",
    userSerde: jsonSerde,
    transformTo: mapper
  };
  const res = await fetchData(inputs);
  console.log(res);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
