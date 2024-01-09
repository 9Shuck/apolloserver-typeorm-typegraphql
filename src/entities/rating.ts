import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from "typeorm";
import { User } from "./user.js";
import { Movie } from "./movie.js";

@ObjectType()
@Entity()
@Unique(["userId", "movieId"])
export class Rating {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  value!: number;

  @Field()
  @Column()
  userId!: number;

  @Field()
  @Column()
  movieId!: number;

  @Field((_type) => User)
  @ManyToOne((_type) => User, (user) => user.ratings)
  user!: User;

  @Field((_type) => Movie)
  @ManyToOne((_type) => Movie, (movie) => movie.ratings)
  movie!: Movie;
}
