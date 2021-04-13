import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils";

// resolver를 protect해야 돼. 사진 업로드는 로그인한 상태에서만 가능한 작업이니까
export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        // 사진을 파일시스템에 업로드하는 작업을 또 거칠 필요는 없을거 같아
        // 캡션속에 있는 Hashtag들을 추출해야 해
        // 근데 caption은 존재할수도 있고 존재하지 않을수도 있잖아 그래서 caption 존재 여부에 따라 추가해줘야 해
        // caption이 존재할때만 실행하고, caption이 없으면 아무것도 하지 않을거야
        if (caption) {
          const hashtags = caption.match(/#[\w]+/g);
          /// parse cation
          // get or create Hashtags
        }
        // save the photo WITH the parsed hashtags
        // add the photo to the hashtags
        client.photo.create({
          data: {
            file,
            caption,
            hashtags: {
              // 여기에서 추출한 Hastag 하나당 connectOrCreate를 적용시킬거야
              connectOrCreate: [
                {
                  where: {
                    hashtag: "#food",
                  },
                  // Hastag 존재하지 않으면 새로 만든다.
                  create: {
                    hashtag: "#food",
                  },
                },
              ],
            },
          },
        });
      }
    ),
  },
};
