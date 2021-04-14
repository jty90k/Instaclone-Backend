import client from "../../client.js";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils.js";

// resolver를 protect해야 돼. 사진 업로드는 로그인한 상태에서만 가능한 작업이니까
export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        // 내부 hashtagObj 를 밖에 있는 걸로 빼주기 위해서는 hashtagObj를 [] 만든다.
        let hashtagObj = [];
        // 사진을 파일시스템에 업로드하는 작업을 또 거칠 필요는 없을거 같아
        // 캡션속에 있는 Hashtag들을 추출해야 해
        // 근데 caption은 존재할수도 있고 존재하지 않을수도 있잖아 그래서 caption 존재 여부에 따라 추가해줘야 해
        // caption이 존재할때만 실행하고, caption이 없으면 아무것도 하지 않을거야
        if (caption) {
          hashtagObj = processHashtags(caption);
          /// parse cation
          // get or create Hashtags
        }
        // save the photo WITH the parsed hashtags
        // add the photo to the hashtags
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
      }
    ),
  },
};
