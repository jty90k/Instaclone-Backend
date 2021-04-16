import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

// 어떻게 메세지에 읽음 표시를 할까?
// 1. 먼저 메세지가 우리가 보낸 메세지가 아니라는 걸 확인해야 돼
// 2. 우리가 현재 들어가 있는 대화방 상에서 메세지가 보내진 건지도 확인해야 해
// 3. 그 메세지가 arguments의 id를 갖고 있는지도 확인해야 돼
export default {
  Mutation: {
    readMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      // 지금 이게 존재하는지 아닌지만 확인하려고 find 하는 것
      const message = await client.message.findFirst({
        // where: {id} 먼저 우리는 arguments상의 id랑 똑같은 id를 가진 메세지를 검색하고 (위 아이디)
        where: {
          id,
          // 이제 메세지를 검색하는데 메세지를 보낸 사용자가
          userId: {
            //지금 이부분은 이 메세지가 내가 보낸 메세지가 아니라는 걸 뜻 해
            // 현재 로그인 되어 있는 사용자가 아닌 경우 일 때만 검색하고
            not: loggedInUser.id,
          },
          // 현재 로그인 된 사용자가 들어가 있는 대화방에서 보내진 메세지를 검색하고 있어
          room: {
            users: {
              // 오직 나만 그 메세제지를 읽음 표시 할 수 있어
              some: {
                id: loggedInUser.id,
              },
            },
          },
        },
        select: {
          id: true,
        },
      });
      if (!message) {
        return {
          ok: false,
          error: "Message not found.",
        };
      }
      // 여기에 메세지가 검색 된 이후에 메세지 내용을 업데이트 할 거야
      // 메세지 업데이트시 id가 argument상의 id(위)랑 똑같을 때 업데이트 한다.
      await client.message.update({
        where: {
          id,
        },
        // 업데이트 할 내용 read: true
        data: {
          read: true,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
