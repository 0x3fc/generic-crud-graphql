import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
export class BaseModel extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Int)
  @Column("int")
  createdAt: number;

  @Field(() => Int)
  @Column("int")
  updatedAt: number;

  @BeforeInsert()
  beforeInsert() {
    const now = Date.prototype.unix();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = Date.prototype.unix();
  }
}
