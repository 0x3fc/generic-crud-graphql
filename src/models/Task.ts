import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { BaseModel } from "../bases/BaseModel";

@ObjectType()
@Entity("tasks")
export class Task extends BaseModel {
  @Field()
  @Column()
  name: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  completed: boolean = false;
}
