import client from "../client.js";
export default {
  Mutation: {
    createMovie: (_, { title, year, genre }) =>
      //client .movie. create는 retrun 값이 Movie이다 그래서 type Mutation createMovie (~) : Boolean -> Movie로 변경해 준다.
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),
    deleteMovie: (_, { id }) => client.movie.delete({ where: { id } }),
    updateMovie: (_, { id, year }) =>
      client.movie.update({ where: { id }, data: { year } }),
  },
};
