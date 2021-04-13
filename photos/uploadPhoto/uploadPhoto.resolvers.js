import { protectedResolver } from "../../users/users.utils";

// resolver를 protect해야 돼. 사진 업로드는 로그인한 상태에서만 가능한 작업이니까
export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        // 사진을 파일시스템에 업로드하는 작업을 또 거칠 필요는 없을거 같아
        if (caption) {
          /// parse cation
          // get or create Hashtags
        }
        // save the photo WITH the parsed hashtags
        // add the photo to the hashtags
      }
    ),
  },
};
