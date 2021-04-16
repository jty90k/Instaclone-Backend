import { gql } from "apollo-server";

export default gql`
  type Mutation {
    sendMessage(payload: String!, roomId: Int, userId: Int): MutationResponse!
  }
`;
// roomId는 필수로 하지 않는다 왜냐? : 나는 대화방한테 메세지를 보낼 수도 있고 사용자한테 메세지를 보낼 수도 있기 때문이지

// 대화방은 null인데 사용자 Id 2에게 보낸다면
// 나는 아직 그 사용자와 대화방이 없으므로 그 사용자랑 대화를 새롭게 시작하고 싶다는 말이 되지 좋아. 그게 바로 앞으로 일어날 일이야
// 그래서 저기에 (roomdID, userId) required 표시가 없는 거야
// 어쩔 때는 room ID가 필요하고, 어쩔 때는 사용자 ID만 필요할 수도 있으니까
// sendMessage("Hello", null, 2 )
