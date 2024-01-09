import { dataSource } from "../datasource.js";
import { Movie } from "../entities/movie.js";
import { Rating } from "../entities/rating.js";
import { User } from "../entities/user.js";
import { Favorite } from "../entities/favorite.js";
import { Comment } from "../entities/comment.js";
import bcrypt from "bcrypt";
import {
  getRandomComment,
  getRandomSubarray,
} from "../helpers/seeder.helper.js";

export async function seedDatabase() {
  const movieRepository = dataSource.getRepository(Movie);
  const ratingRepository = dataSource.getRepository(Rating);
  const userRepository = dataSource.getRepository(User);
  const favoriteRepository = dataSource.getRepository(Favorite);
  const commentRepository = dataSource.getRepository(Comment);

  let users = [];
  const existingUsers = await userRepository.find();
  if (existingUsers.length === 0) {
    for (let i = 1; i <= 5; i++) {
      const hashedPassword = await bcrypt.hash(`password${i}`, 12);
      const user = userRepository.create({
        email: `user${i}@example.com`,
        nickname: `user${i}`,
        password: hashedPassword,
      });
      users.push(user);
    }
    await userRepository.save(users);
  } else {
    users = existingUsers;
  }

  const existingMovies = await movieRepository.find();
  let movies = [];
  if (existingMovies.length === 0) {
    for (let i = 1; i <= 20; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const movie = movieRepository.create({
        title: `Movie ${i}`,
        releaseDate: new Date(),
        duration: 90 + i * 5,
        genre: `Genre ${i}`,
        plot: `Plot of movie ${i}`,
        poster: `https://placehold.co/600x${400 + i}`,
        userId: randomUser,
      });
      movies.push(movie);
    }
    movies = await movieRepository.save(movies);

    for (const user of users) {
      const favoriteMovies = getRandomSubarray(movies, 4, 7);
      const favorites = favoriteMovies.map((movie) =>
        favoriteRepository.create({
          user,
          movie,
        })
      );
      await favoriteRepository.save(favorites);
    }

    for (const user of users) {
      const ratingMovies = getRandomSubarray(movies, 4, 7);
      const ratings = ratingMovies.map((movie) =>
        ratingRepository.create({
          user,
          movie,
          value: Math.floor(Math.random() * 5) + 1,
        })
      );
      await ratingRepository.save(ratings);
    }

    for (const movie of movies) {
      const comments = getRandomSubarray(users, 15, 20).map((user) =>
        commentRepository.create({
          content: getRandomComment(),
          user,
          movie,
        })
      );
      await commentRepository.save(comments);
    }
  } else {
    movies = existingMovies;
  }

  return {
    defaultUser: users[0],
    users,
  };
}
