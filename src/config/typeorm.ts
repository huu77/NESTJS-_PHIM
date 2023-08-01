import { ConnectionOptions } from "typeorm";


const config: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "huucaca2002",
  database: "postgres",
  entities: ["dist/**/*.entity{.ts,.js}"],
  // migrations: ["dist/migrations/*{.ts,.js}"],
  synchronize: false,
};

 
export default config;