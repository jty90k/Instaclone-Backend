import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
export default {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { payload, roomId, userId }, { loggedInUser }) => {
        let room = null;
        if (userId) {
          const user = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });
          if (!user) {
            return {
              ok: false,
              error: "This user does not exist.",
            };
          }
          room = await client.room.create({
            data: {
              users: {
                connect: [
                  {
                    id: userId,
                  },
                  {
                    id: loggedInUser.id,
                  },
                ],
              },
            },
          });
          // roomId가 있을 땐 어떤 일이 일어날까? -만약 roomId가 있을 때는 1.대화방도 찾아야 하고 2.메세지도 만들어야 한다.
          // 사용자가 대화방의 id(roomId)를 보낼 경우  그 id의 대화방을 찾아야되는 거지
        } else if (roomId) {
          room = await client.room.findUnique({
            where: {
              id: roomId,
            },
            // 만약 좀 더 최적화(optimize)하고 싶다면 select를 쓴다.
            select: {
              id: true,
            },
          });
          if (!room) {
            return {
              ok: false,
              error: "Room not found.",
            };
          }
        }
        await client.message.create({
          data: {
            // payload: 메세지를 가지고 있다. ex: hey hello
            payload,
            room: {
              //newMessage가 newRoom.id 대신에 room.id 에서 id를 갖고 오도록할거야
              // 새롭게 생성한 대화방에서 생성하거나 혹은 우리가 찾아낸 대화방에서 생성하는거지
              connect: {
                id: room.id,
              },
            },
            // users는 이 메세지를 보낸 사용자야
            // 그리고 현재 로그인 되어있는 사용자에게 메세지를 보내는 거겠지
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
