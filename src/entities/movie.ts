import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Comment } from "./comment.js";
import { Favorite } from "./favorite.js";
import { Rating } from "./rating.js";
import { User } from "./user.js";

@ObjectType()
@Entity()
export class Movie {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column("date")
  releaseDate!: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  poster?: string;

  @Field()
  @Column()
  duration!: number;

  @Field()
  @Column()
  genre!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  plot?: string;

  @Field()
  @Column()
  userId!: number;

  @OneToMany((_type) => Comment, (comment) => comment.movie)
  comments!: Comment[];

  @OneToMany((_type) => Rating, (rating) => rating.movie)
  ratings!: Rating[];

  @OneToMany((_type) => Favorite, (favorite) => favorite.movie)
  favoritedBy!: Favorite[];

  @Field((_type) => User)
  @ManyToOne((_type) => User, (user) => user.movies)
  user!: User;
}
