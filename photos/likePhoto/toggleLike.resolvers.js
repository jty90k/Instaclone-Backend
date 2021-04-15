import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
      });
      if (!photo) {
        return {
          ok: false,
          error: "Photo not found Please check again!",
        };
      }
      const likeWhere = {
        photoId_userId: {
          userId: loggedInUser.id,
          photoId: id,
        },
      };
      const like = await client.like.findUnique({
        where: likeWhere,
      });
      // 좋아요 삭제
      if (like) {
        await client.like.delete({
          where: {
            photoId_userId: {
              userId: loggedInUser.id,
              photoId: id,
            },
          },
        });
        // 좋아요 생성
      } else {
        await client.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            photo: {
              connect: {
                id: photo.id,
              },
            },
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};
