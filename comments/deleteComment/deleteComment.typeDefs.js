import { gql } from "apollo-server-core";

export default gql`
  type DeleteCommentMutation {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteComment(id: Int!): DeleteCommentMutation!
  }
`;
