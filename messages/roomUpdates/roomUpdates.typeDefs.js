import { gql } from "apollo-server-core";

export default gql`
  type Subscription {
    roomUpdates(id: Int!): Message
  }
`;

//id: Int! 값을 주는 거는 roomUpdate.resolvers.js에 subscription resolver을 authentication으로 보호하겠다는 말이다.
//  roomUpdates는 Message를 여기서 return한다. / 필수가 아니기 때문에 ,null이 될 수도 있다.(중요!)
