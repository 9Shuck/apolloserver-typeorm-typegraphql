import { Field, InputType, Int } from "type-graphql";

@InputType()
export class RatingInput {
  @Field(_type => Int)
  movieId!: number;

  @Field(_type => Int)
  value!: number;

}
