import { gql } from "apollo-server";

export default gql`
  type Comment {
    id: Int!
    user: User!
    photo: Photo!
    payload: String!
    # isMine: Comment 작성자 / 내가 Comment를 작성했다면 Comment를 삭제할 수 있는 x 버튼 보여주기
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
