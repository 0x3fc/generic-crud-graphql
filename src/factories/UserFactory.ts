import { hashSync } from "bcryptjs";
import * as faker from "faker";
import { BaseFactory } from "../bases/BaseFactory";
import { User } from "../models/User";

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
