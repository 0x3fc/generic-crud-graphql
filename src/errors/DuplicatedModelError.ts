import { GraphQLError } from "graphql";

export class DuplicatedModelError extends GraphQLError {
  constructor() {
    super("Model already exists");
  }
}
