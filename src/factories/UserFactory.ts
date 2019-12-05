import { hashSync } from "bcryptjs";
import * as faker from "faker";
import { User } from "../models/User";
import { BaseFactory } from "./BaseFactory";

export class UserFactory extends BaseFactory<User> {
  constructor() {
    super(User);
  }

  defaultProperties = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  async beforeCreateHook(instance: User) {
    instance.password = hashSync(instance.password);
  }
}
