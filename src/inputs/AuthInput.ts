import { IsAlphanumeric, IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

const USERNAME_LENGTH = { min: 3, max: 16 };
const EMAIL_LENGTH = { min: 3, max: 128 };
const PASSWORD_LENGTH = { min: 8, max: 64 };

@InputType()
export class LoginInput {
  @Field()
  @IsAlphanumeric()
  @Length(USERNAME_LENGTH.min, USERNAME_LENGTH.max)
  username: string;

  @Field()
  @Length(PASSWORD_LENGTH.min, PASSWORD_LENGTH.max)
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  @IsAlphanumeric()
  @Length(USERNAME_LENGTH.min, USERNAME_LENGTH.max)
  username: string;

  @Field()
  @IsEmail()
  @Length(EMAIL_LENGTH.min, EMAIL_LENGTH.max)
  email: string;

  @Field()
  @Length(PASSWORD_LENGTH.min, PASSWORD_LENGTH.max)
  password: string;
}
