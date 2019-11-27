import { createConnection } from "typeorm";
import { config } from "../config";

export const connectDb = () => {
  createConnection(config.database.default);
};
