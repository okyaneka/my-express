import config from "./app";
import mysql from "mysql2/promise";

const useDB = async () =>
  await mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_NAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    port: config.DB_PORT,
  });

export default useDB;
