import client from "../../client.js";

export default {
  Query: {
    searchPhotos: (_, { keyword }) =>
      client.photo.findMany({
        where: {
          caption: {
            startsWith: keyword,
          },
        },
      }),
  },
};
