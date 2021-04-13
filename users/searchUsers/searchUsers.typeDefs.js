import { gql } from "apollo-server-core";

// error를 띄우고 싶다면 여기에서 하면 된다.
// keyword를 3~4개 글자보다 길게 입력하라고 메세지 띄울 수 있다.
export default gql`
  type Query {
    searchUsers(keyword: String!): [User]
  }
`;
