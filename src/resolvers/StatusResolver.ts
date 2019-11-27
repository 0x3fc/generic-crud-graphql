import { Query, Resolver } from "type-graphql";

@Resolver()
export class StatusResolver {
  @Query(() => String)
  public async ping() {
    return "pong";
  }
}
