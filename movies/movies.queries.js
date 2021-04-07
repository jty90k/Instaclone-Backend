import client from "../client.js";

export const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, { id }) => client.movie.findUnique({ where: { id } }),
  },
};
