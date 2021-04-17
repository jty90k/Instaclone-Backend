import { NEW_MESSAGE } from "../../constans";
import pubsub from "../../pubsub.js";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: () => pubsub.asyncIterator(NEW_MESSAGE),
    },
  },
};
