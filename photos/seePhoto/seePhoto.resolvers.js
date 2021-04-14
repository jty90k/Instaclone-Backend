import client from "../../client.js";

// seePhoto는 protect를 하지 않는다. ? - 모든 사람이 와서 보기 때문이다.
export default {
  Query: {
    seePhoto: (_, { id }) =>
      client.photo.findUnique({
        where: {
          id,
        },
      }),
  },
};
