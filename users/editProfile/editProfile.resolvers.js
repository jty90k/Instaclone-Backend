import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client.js";
import { protectedResolver } from "../users.utils.js";

console.log(process.cwd());

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  let avatarUrl = null;
  if (avatar) {
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const { createReadStream, filename } = await avatar;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:4000/static/${newFilename}`;
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
