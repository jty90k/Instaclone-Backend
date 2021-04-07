import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
  # definition type
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id: Int!): Movie
    updateMovie(id: Int!, year: Int!): Movie
  }
`;
