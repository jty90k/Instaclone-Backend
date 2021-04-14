import client from "../../client.js";

export default {
  Query: {
    seePhotoComments: (_, { id }) =>
      client.comment.findMany({
        where: {
          photoId: id,
        },
        //pagination 여기에서 쓴다. skip take cursor
        orderBy: {
          createdAt: "asc",
        },
      }),
  },
};
