import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import {
  BaseCreateInput,
  BaseFindOneInput,
  BaseUpdateInput,
} from "../bases/BaseInput";

@InputType()
export class FindOneTaskInput extends BaseFindOneInput {}

@InputType()
export class CreateTaskInput extends BaseCreateInput {
  @Field()
  @MinLength(1)
  name: string;

  @Field({ defaultValue: false })
  completed: boolean = false;
}

@InputType()
export class UpdateTaskInput extends BaseUpdateInput {
  @Field({ nullable: true })
  @MinLength(1)
  name?: string;

  @Field({ nullable: true })
  completed?: boolean;
}
