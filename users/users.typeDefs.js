import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    photos: [Photo]
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    # isMe : Instagram edit Profile (Button) 본인 아이디 및 token을 가진 상태에서만 할 수 있다.
    isMe: Boolean!
    # isFollowing : Instagram Follow & unFollow 상태 (Button)
    isFollowing: Boolean!
  }
`;
