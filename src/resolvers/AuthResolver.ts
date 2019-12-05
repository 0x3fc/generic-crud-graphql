import * as bcrypt from "bcryptjs";
import { Response } from "express";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { config } from "../config";
import { DuplicatedModelError } from "../errors/DuplicatedModelError";
import { ModelNotFoundError } from "../errors/ModelNotFoundError";
import { LoginInput, RegisterInput } from "../inputs/AuthInput";
import { IContext } from "../middlewares/Context";
import { User } from "../models/User";
import { Token } from "../utils/Token";

const COOKIE_MAX_AGE = config.jwt.cookieMaxAge;

@Resolver()
export class UserResolver {
  @Query(() => User)
  public async me(@Ctx() { userId }: IContext) {
    if (!userId) {
      throw new ModelNotFoundError();
    }

    const user = await User.findOneOrFail(userId);
    user.token = Token.signAccess(user);

    return user;
  }

  @Mutation(() => User)
  public async register(
    @Arg("payload")
    { username, email, password }: RegisterInput,
    @Ctx() { res }: IContext
  ) {
    // TODO: Move existent test to validator
    const userExists = await User.findOne({
      where: [{ username }, { email }],
    });
    if (userExists) {
      throw new DuplicatedModelError();
    }

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = bcrypt.hashSync(password);

    await user.save();

    user.token = Token.signAccess(user);
    this.setCookie(res, Token.signRefresh(user));

    return user;
  }

  @Mutation(() => User)
  public async login(
    @Arg("payload") { username, password }: LoginInput,
    @Ctx() { res }: IContext
  ) {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new ModelNotFoundError();
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new ModelNotFoundError();
    }

    user.token = Token.signAccess(user);
    this.setCookie(res, Token.signRefresh(user));

    return user;
  }

  private setCookie(res: Response, token: string) {
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: COOKIE_MAX_AGE,
    });
  }
}
