import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { BaseModel } from "./BaseModel";

@ObjectType()
@Entity("users")
export class User extends BaseModel {
  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  token?: string;
}
