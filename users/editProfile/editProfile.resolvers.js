import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client.js";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newPassword },
      { token }
    ) => {
      const { id } = await jwt.verify(token, process.env.SECRET_KEY);
      let uglyPassowrd = null;
      // hass passord
      if (newPassword) {
        uglyPassowrd = await bcrypt.hash(newPassword, 10);
      }
      const updateUser = await client.user.update({
        where: {
          id,
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
