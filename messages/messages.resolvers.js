import client from "../client.js";

// 이 로직은 사용자 2~5명 정도
// 만약 3000명이 이용하는 방을 만들고 싶다면 user를 작성하면 안돼 강의 <7.4 seeRoom 8분 쯤>
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
    // 아직 읽지 않은 메세지 갯수
    // 누가 unreadTotal을 호출하는지를 고려하지 않았다는거
    // 상대방: 안 읽은 메세지 갯수 (unread total)은 1 이라는 것
    // 나: 나한테는 아직 안 읽은 메세지 갯수 (unread total)는 0이 되어야 해 (왜? : 내가 보냈으니까)
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      // 조건 : 이 대화방 안에 있는 메세지여야 하고 / 내가 보낸 게 아니어야 해 즉 : loggedInUser를 호출하는 사람에 의해 보내진 게 아닌 메세지들
      // A(보내는 사람): 메세지를 보낸다면 <대화방은 그사람한테 어떻게 보일까? / 안 읽힌 메세지가 아무것도 없겠지>
      // B(받는 사람) : 상대방의 메세지 방은 어떻게 보일까? -> 읽어야 할 메세지가 있네?
      // count-counting message
      return client.message.count({
        where: {
          // 아직 안 읽혔고,
          read: false,
          // 이 대화방안에 있고
          roomId: id,
          // 한 가지 방법 id:12 처럼 쓰고 끝내는 거고
          // 다른 방법은 id 라고 쓰고 in이라고
          user: {
            id: {
              // 내가 생성한게 아닌 메세지들
              not: loggedInUser.id,
            },
          },
        },
      });
    },
  },
  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
  },
};
