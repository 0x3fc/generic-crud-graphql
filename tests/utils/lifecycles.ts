import { Connection } from "typeorm";
import { connectDb } from "../../src/bootstrap/database";

let connection: Connection;

beforeEach(async () => {
  if (connection === undefined) {
    connection = await connectDb();
    return;
  }

  await connection.synchronize(true);
});
