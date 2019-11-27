import { GraphQLError } from "graphql";

export class ModelNotFoundError extends GraphQLError {
  constructor() {
    super("Model does not found");
  }
}
