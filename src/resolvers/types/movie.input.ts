import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class MovieInput {
  @Field()
  @Length(1, 100) // Would limit comments doing this instead of directly inside the DB.
  title!: string;

  @Field()
  releaseDate!: string;

  @Field({ nullable: true })
  poster?: string;

  @Field()
  duration!: number;

  @Field()
  genre!: string;

  @Field({ nullable: true })
  plot?: string;
}
