import client from "../client";

// 이 로직은 사용자 2~5명 정도
// 만약 3000명이 이용하는 방을 만들고 싶다면 user를 작성하면 안돼 강의 <7.4 seeRoom 8분 쯤>
//
export default {
  Room: {
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }) =>
      client.message.findMany({
        where: {
          roomId: id,
        },
      }),
    // 먼저 대화방 안 메세지 중 몇 개가 읽히지 않았는지 갯수를 세어야 해 하지만 그렇게 하려면 먼저 우리의 message 모델을 바꿔야 해
    unseenTotal: () => 0,
  },
};
