import { GraphQLError } from "graphql";

export class NotImplementedError extends GraphQLError {
  constructor() {
    super("Endpoint is not implemented");
  }
}
