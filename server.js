require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema.js";
import { getUser, protectResolver } from "./users/users.utils.js";
import pubsub from "./pubsub.js";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    };
  },
});

const app = express();
apollo.applyMiddleware({ app });
apollo.installSubscriptionHandlers(app);
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
app.listen({ port: PORT }, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT} ✅`);
});
