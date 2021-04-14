import { gql } from "apollo-server-core";

//Graphql은 우리가 필수 ! 로 지정하지 않는 한, 모든 항목은 성택항목이다.
export default gql`
  type Photo {
    id: Int!
    user: User
    file: String!
    caption: String!
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
  }
  # Hastag 탑입이 명시 되어 있지 않다. 해결방법 2가지 1) 해당 파일내에 type Hastag 만든다.

  # 문제는? Hastag와 Photo가 얼마나 자주 상호 작용하고 있지? 자주? 가끔? Hastag와 상호 작용하는 요소들이 Photo 말고도 더 있나? <이게 무슨 말이냐면>
  # Hashtag라는 타입 또는 모델을 photos 모듈내에 만들 수도 있어. 이런 디자인 설계가 프로그래머로서 제일 힘든 부분이다. 아니면 반대로
  # Hashtag를 별도의 모듈로 분리시킬수도 있어 왜냐 Hashtag는 Photo에서도 쓸수있지만 Comment에서도 쓸수있으니까 //
  # 실제 인스타에서도 댓글속에도 Hashtagg를 사용할수 있는것처럼 말야//
  # 자, 그럼 한번 생각해보는거지. Hashtag를 photos 모듈내에 만드는게 좋을까? 아니면 Hastag라는 새로운 모듈을 만들까?
  # Nico: 그 모델간의 의존성이 높다고 판단되면 // 예를 들어 Photo 없이는 Hashtag도 존재하지 못하는 구조라면 Hashtag를 같은 모듈(photos)내에 추가해주는 편이야
  # 노마드코더 웹사이트를 예로 들어 (코스,강의,댓글) 모듈이 각기 존재해 만약 (강의)가 없으면 (댓글,코스)도 존재할수 없다. 이 3가지의 요소들은 서로 의존성이 강하니 하나로 묶는다. !판단은 스스로 하세요!
  # 네가 봤을떄 독립적인 모듈로 분리시키는게 더 적합할 것같으면 그렇게 해도 돼. 반면에 hashtag 사진 없이는 존재하지 못하니까 한 모듈로 묶을 거야, 라고 생각하면 그렇게 해도 돼
  # 나는(Nico) 보통 시작할 때 한 모슐 속에 모든걸 포함시킨 다음에, 에를 들어 Hastag가 Photo말고 Comment나 다른 모델에도 쓰인다는걸 알게 되면 그 떄 Hashtag를 독립적인 모듈로 분리시키는 편이야
  # 난(Nico) 일단 제일 쉬운 방법으로 진쟁해보고 필요할 때마다 코드를 수정하고 좀 더 다듬고 그런 식으로 반복하는걸 선호해
  type Hashtag {
    id: String!
    hashtag: String!
    photos: [Photo]
    createdAt: String!
    updatedAt: String!
  }
`;
