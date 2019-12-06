import { Field, InputType } from "type-graphql";

const PLACEHOLDER_DEPRECATION_REASON = "Default input placeholder";

@InputType({ isAbstract: true })
export class BaseFindOneInput {
  @Field()
  id: string;
}

@InputType({ isAbstract: true })
export class BaseCreateInput {
  @Field({
    nullable: true,
    deprecationReason: PLACEHOLDER_DEPRECATION_REASON,
  })
  _placeholder?: string;
}

@InputType({ isAbstract: true })
export class BaseUpdateInput {
  @Field()
  id: string;
}

@InputType({ isAbstract: true })
export class BaseDeleteInput {
  @Field()
  id: string;
}
