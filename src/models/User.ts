import { hashSync } from "bcryptjs";
import { Field, ObjectType } from "type-graphql";
import { BeforeInsert, Column, Entity } from "typeorm";
import { BaseModel } from "../bases/BaseModel";

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

  @BeforeInsert()
  encryptPassword() {
    this.password = hashSync(this.password);
  }
}
