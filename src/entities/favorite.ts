import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./user.js";
import { Movie } from "./movie.js";

@ObjectType()
@Entity()
export class Favorite {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  userId!: number;

  @Field()
  @Column()
  movieId!: number;

  @Field((_type) => User)
  @ManyToOne((_type) => User, (user) => user.favorites)
  user!: User;

  @Field((_type) => Movie)
  @ManyToOne((_type) => Movie, (movie) => movie.favoritedBy)
  movie!: Movie;
}
