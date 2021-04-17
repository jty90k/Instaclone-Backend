import { withFilter } from "graphql-subscriptions";
import client from "../../client";
import { NEW_MESSAGE } from "../../constans";
import pubsub from "../../pubsub.js";

export default {
  Subscription: {
    roomUpdates: {
      // server.js -> here /
      subscribe: async (root, args, context, info) => {
        //room이 존재하는지 안 하는지 찾는 로직
        //존재한다면, 유저는 업데이트를 리스닝할 수 있는 거야.
        //user가 리스닝하기 이전에 체크하는 거거든
        const room = await client.room.findFirst({
          where: {
            id: args.id,
            users: {
              some: {
                id: context.loggedInUser.id,
              },
            },
          },
          select: {
            id: true,
          },
        });
        //room이 존재하지 않으면, 사람이 room을 리스닝하지 못하게 막는거야.
        if (!room) {
          throw new Error("You shall not see this");
        }
        //이 witherFilter의 두번째 function은 우리가 publish할 때만 실행 돼.
        return withFilter(
          //user가 리스닝을 시작하기 전에 체크하는데, 만약 여러분이 다시 체크하기 원한다면 그렇게도 할 수도 있지.
          () => pubsub.asyncIterator(NEW_MESSAGE),
          //(중요) roomUpdates 이 function은 모든 trigger, 즉 모든 publish에서 사용될 거야.
          // arguments=roomUpdates , conext=id
          //roomUpdates from sendMessage.resolvers.js (pubsub.publish~)
          async ({ roomUpdates }, { id }, { loggedInUser }) => {
            if (roomUpdates.roomId === id) {
              const room = await client.room.findFirst({
                where: {
                  id,
                  users: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
                select: {
                  id: true,
                },
              });
              if (!room) {
                return false;
              }
              return true;
            }
          }
        )(root, args, context, info);
      },
    },
  },
};

// 2개의 filter를 만들어야 함.
// 1. 여러분 app에서의 모든 메세지의 업데이트를 다 리스닝할 수 없어. / 오직 단 하나 여러분이 보낸 id를 가진 room에서의 메세지만 리스닝할 수 있어.
// 2.
