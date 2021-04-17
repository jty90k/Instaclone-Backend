import { withFilter } from "graphql-subscriptions";
import client from "../../client";
import { NEW_MESSAGE } from "../../constans";
import pubsub from "../../pubsub.js";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        //room이 존재하는지 안 하는지 찾는 로직
        //존재한다면, 유저는 업데이트를 리스닝할 수 있는 거야.
        const room = await client.room.findUnique({
          where: {
            id: args.id,
          },
          select: {
            id: true,
          },
        });
        //room이 존재하지 않으면, 사람이 room을 리스닝하지 못하게 막는거야.
        if (!room) {
          throw new Error("You shall not see this");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          ({ roomUpdates }, { id }) => {
            return roomUpdates.roomId === id;
          }
        )(root, args, context, info);
      },
    },
  },
};

// 2개의 filter를 만들어야 함.
// 1. 여러분 app에서의 모든 메세지의 업데이트를 다 리스닝할 수 없어. / 오직 단 하나 여러분이 보낸 id를 가진 room에서의 메세지만 리스닝할 수 있어.
// 2.
