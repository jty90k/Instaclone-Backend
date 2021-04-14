import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils.js";

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser }) => {
        const ok = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "Photo not found Please check again!",
          };
        }
        const photo = await client.photo.update({
          where: {
            id,
          },
          data: {
            caption,
          },
        });
        console.log(photo);
      }
    ),
  },
};
