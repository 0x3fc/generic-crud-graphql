import { createConnection } from "typeorm";
import { config } from "../config";

export const connectDb = () => {
  const isTesting = process.env.NODE_ENV === "test";
  const connectionConfig = isTesting
    ? config.database.testing
    : config.database.default;
  return createConnection(connectionConfig);
};
