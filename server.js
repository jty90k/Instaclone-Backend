require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema.js";

const PORT = process.env.PORT;
const server = new ApolloServer({
  schema,
  context: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3OTUxNTM3fQ.0yyKOYvkvxc8efD-r_L-Hpb6ACkOEdcKZGCOhW4EnU0",
  },
});

server
  .listen(PORT)
  .then(() =>
    console.log(`🚀 Server is running on http://localhost:${PORT} ✅`)
  );
