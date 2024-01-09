import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from "typeorm";
import { Comment } from "./comment.js";
import { Favorite } from "./favorite.js";
import { Rating } from "./rating.js";
import { Movie } from "./movie.js";

@ObjectType()
@Entity()
@Unique(["email"])
export class User {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  nickname!: string;

  @Column()
  password!: string;

  @OneToMany((_type) => Comment, (comment) => comment.user)
  comments!: Comment[];

  @OneToMany((_type) => Rating, (rating) => rating.user)
  ratings!: Rating[];

  @OneToMany((_type) => Favorite, (favorite) => favorite.user)
  favorites!: Favorite[];

  @OneToMany((_type) => Movie, (movie) => movie.user)
  movies!: Movie[];
}
