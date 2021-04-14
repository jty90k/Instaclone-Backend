import client from "../client.js";

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        where: {
          photo: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
