import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });
      // 찾지 못한 경우
      if (!photo) {
        return {
          ok: false,
          error: "Photo not found Please check again!",
        };
        // photo를 찾았는데 photo의 userId가 loggedInUser.id와 같지 않은 경우
      } else if (photo.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorized",
        };
        // photo를 찾고 userId가 loggedInUser.id와 같은 경우  사진을 delete한다.
        // photo가 존재하고, 로그인 유저의 id가 photo의 userId와 같다면 Photo를 delete 할 수 있다는 말이 된다.
      } else {
        await client.photo.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};
