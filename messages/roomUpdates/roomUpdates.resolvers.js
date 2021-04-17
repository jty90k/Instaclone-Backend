import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGE } from "../../constans";
import pubsub from "../../pubsub.js";

export default {
  Subscription: {
    roomUpdates: {
      //첫 번째 function은 async iterator(NEW_MESSAGE)
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        //두 번째 function이 true를 return한다면, user는 업데이트를 받을 거야
        //두 번째 function은 arguments은 payload과 variables이야
        // id를 알아냄으로써 roomId를 알게 되었다.
        ({ roomUpdates }, { id }) => {
          return roomUpdates.roomId === id;
        }
      ),
    },
  },
};

// 2개의 filter를 만들어야 함.
// 1. 여러분 app에서의 모든 메세지의 업데이트를 다 리스닝할 수 없어. / 오직 단 하나 여러분이 보낸 id를 가진 room에서의 메세지만 리스닝할 수 있어.
// 2.
