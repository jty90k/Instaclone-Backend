import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client.js";
import { protectedResolver } from "../users.utils.js";
import { uploadToS3 } from "../../shared/shared.utils.js";

console.log(process.cwd());

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  // 사진파일 업로드 하는 로직
  let avatarUrl = null;
  if (avatar) {
    avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
    // const { filename, createReadStream } = await avatar;
    // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    // const readStream = createReadStream();
    // const writeStream = createWriteStream(
    //   process.cwd() + "/uploads/" + newFilename
    // );
    // readStream.pipe(writeStream);
    // avatarUrl = `http://localhost:4000/static/${newFilename}`;
  }
  // hass passord
  let uglyPassowrd = null;
  if (newPassword) {
    uglyPassowrd = await bcrypt.hash(newPassword, 10);
  }
  const updateUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(uglyPassowrd && { password: uglyPassowrd }),
      ...(avatarUrl && { avatar: avatarUrl }),
    },
  });
  if (updateUser) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update user's update profile",
    };
  }
};
export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
