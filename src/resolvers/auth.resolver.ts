import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  FieldResolver,
  Root,
} from "type-graphql";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { User } from "../entities/user.js";
import { Context } from "../context.type.js";
import { dataSource } from "../datasource.js";
import { AuthenticationError } from "type-graphql";
import { LoginResponse } from "./types/login.response.js";

@Resolver((_of) => User)
export class AuthResolver {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = dataSource.getRepository(User);
  }

  @Mutation(() => User)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("nickname") nickname: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = this.userRepository.create({
      email,
      nickname,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    return user;
  }

  @Mutation(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: Context
  ): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      throw new AuthenticationError("User not found");
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError("Invalid password");
    }
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: process.env.TOKEN_EXPIRATION_TIME }
    );

    return accessToken;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() context: Context) {
    if (!context.user) {
      return null;
    }
    return this.userRepository.findOne({ where: { id: context.user.id } });
  }

  @FieldResolver(() => User)
  async user(@Root() user: User): Promise<User> {
    return (await this.userRepository.findOne({
      where: { id: user.id },
      cache: 1000,
    }))!;
  }
}
