import { ApolloServer } from "apollo-server";
import { typeDefs } from "./movies/movies.typeDefs.js";
import { resolvers } from "./movies/movies.queries.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => console.log("Server is Running on http://localhost:4000/"));
