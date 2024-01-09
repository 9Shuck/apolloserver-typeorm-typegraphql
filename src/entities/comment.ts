import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.js";
import { Movie } from "./movie.js";

@ObjectType()
@Entity()
export class Comment {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column("text")
  content!: string;

  @Field()
  @Column()
  userId!: number;

  @Field()
  @Column()
  movieId!: number;

  @Field((_type) => User)
  @ManyToOne((_type) => User, (user) => user.comments)
  user!: User;

  @Field((_type) => Movie)
  @ManyToOne((_type) => Movie, (movie) => movie.comments)
  movie!: Movie;
}
