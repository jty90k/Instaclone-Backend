import bcrypt from "bcrypt";
import client from "../../client.js";
import { protectedResolver } from "../users.utils.js";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  console.log(avatar);
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
