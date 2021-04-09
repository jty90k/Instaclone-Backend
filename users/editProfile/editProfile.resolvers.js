import bcrypt from "bcrypt";
import client from "../../client.js";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newPassword }
    ) => {
      let uglyPassowrd = null;
      // hass passord
      if (newPassword) {
        uglyPassowrd = await bcrypt.hash(newPassword, 10);
      }
      const updateUser = await client.user.update({
        where: {
          id: 1,
        },
        data: {
          firstName,
          lastName,
          username,
          email,
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
    },
  },
};
