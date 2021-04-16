import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

// ----- 이 id를 가진 대화방을 검색하는 방법! 동시에 우리가 그 안에 들어가있는 대화방이기도 하다. -----

// 이 id를 가진 대화방을 찾고 그리고 또 이 사용자도{loggedInUser} 그 대화방에 있는 사용자여야 하겠지 why?: 다른 사용자들의 대화방을 아무나 다 보게 하면 안되니까
// 그 대화방의 id가 있더라고 그 대화방에 이미 들어가 있어야지
export default {
  Query: {
    //findUnique는 하나만 존재하는 것들만 검색해 준다. (지금 같은 경우에는 room이 가진 것 중에 딱 하나만 있는 건 id 뿐)
    //findFist: 하나만 있는게 아닌 것들도 찾을 수 있게 된다.
    seeRoom: protectedResolver((_, { id }, { loggedInUser }) =>
      client.room.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      })
    ),
  },
};
