import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    likePhoto: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const ok = await client.photo.findUnique({
        where: {
          id,
        },
      });
      if (!ok) {
        return {
          ok: false,
          error: "Photo not found Please check again!",
        };
      }
    }),
  },
};
