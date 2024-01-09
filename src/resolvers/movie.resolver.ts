import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Repository } from "typeorm";
import { RatingInput } from "./types/rating.input.js";
import { MovieInput } from "./types/movie.input.js";
import { Context } from "../context.type.js";
import { dataSource } from "../datasource.js";
import { Rating } from "../entities/rating.js";
import { User } from "../entities/user.js";
import { Movie } from "../entities/movie.js";
import { AuthenticationError } from "type-graphql";

@Resolver((_of) => Movie)
export class MovieResolver {
  private readonly ratingRepository: Repository<Rating>;
  private readonly movieRepository: Repository<Movie>;
  private readonly userRepository: Repository<User>;

  constructor() {
    this.ratingRepository = dataSource.getRepository(Rating);
    this.movieRepository = dataSource.getRepository(Movie);
    this.userRepository = dataSource.getRepository(User);
  }

  @Query((_returns) => Movie, { nullable: true })
  movie(@Arg("movieId", (_type) => Int) movieId: number) {
    return this.movieRepository.findOneBy({ id: movieId });
  }

  @Query((_returns) => [Movie])
  movies(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  @Mutation((_returns) => Movie)
  async addMovie(
    @Arg("movie") movieInput: MovieInput,
    @Ctx() context: Context
  ): Promise<Movie> {
    if (!context.user) {
      throw new AuthenticationError("You must be logged in to add a movie.");
    }
    const movie = this.movieRepository.create(movieInput);
    movie.userId = context.user.id;
    await this.movieRepository.save(movie);
    return movie;
  }

  @Mutation(() => Rating)
  async rateMovie(
    @Arg("rateMovieInput") ratingInput: RatingInput,
    @Ctx() context: Context
  ): Promise<Rating> {
    if (!context.user) {
      throw new AuthenticationError("You must be logged in to rate a movie.");
    }

    const { movieId, value } = ratingInput;
    const userId = context.user.id;
    console.log(userId);
    const existingRating = await this.ratingRepository.findOneBy({
      userId,
      movieId,
    });
    if (existingRating) {
      throw new Error("You have already rated this movie.");
    }

    const rating = this.ratingRepository.create({
      userId,
      movieId,
      value,
    });
    return await this.ratingRepository.save(rating);
  }

  @FieldResolver((_returns) => [Rating])
  async ratings(@Root() movie: Movie): Promise<Rating[]> {
    return this.ratingRepository.find({
      cache: 1000,
      where: { movie: { id: movie.id } },
    });
  }

  @FieldResolver((_returns) => User)
  async user(@Root() movie: Movie): Promise<User> {
    return (await this.userRepository.findOne({
      where: { id: movie.id },
      cache: 1000,
    }))!;
  }
}
