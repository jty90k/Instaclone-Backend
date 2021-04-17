require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema.js";
import { getUser } from "./users/users.utils.js";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      // 지금은 그냥 context를 우리의 필요에 맞게 뽑아낸 거야.
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  //connectionParams는 기본적으로 우리가 볼 수 있는 HTTP headers야!
  //onConnect에 기반해서 user를 인증 -> onConnect는 connection이 이뤄지는 순간에 우리에게 HTTP headers를 준다.
  //우리가 onConnect에서 무엇을 return하던지 context의 한 부분이 될거야.
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You can't listent.");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
});

const app = express();

app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT} ✅`);
});
