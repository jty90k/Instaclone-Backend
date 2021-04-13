import client from "../../client.js";

// 아이디 검색 #단어 하나만 써도 검색이 되는 로직
export default {
  Query: {
    searchUsers: async (_, { keyword }) =>
      client.user.findMany({
        where: {
          username: {
            //startsWith 문자열 검색할 땐 얘가 매우 유용하다.
            //contains를 사용하면 a 검색 시 알파벳 a가 포함 된 username이 모두 검색 된다.
            startsWith: keyword.toLowerCase(),
          },
        },
      }),
  },
};
