import { Field, InputType } from "type-graphql";

const PLACEHOLDER_DEPRECATION_REASON = "Default input placeholder";

@InputType()
export class BaseFindOneInput {
  @Field()
  id: string;
}

@InputType()
export class BaseCreateInput {
  @Field({
    nullable: true,
    deprecationReason: PLACEHOLDER_DEPRECATION_REASON,
  })
  _placeholder?: string;
}
