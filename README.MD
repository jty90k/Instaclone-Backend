# Instaclone

Instaclone Backend

## User:

- [✅] Create Account @ mutation
- [✅] see Profile @ query
- [✅] Login
- [✅] Edit Profile
- [✅] Change Avatar (Image Upload)
- [✅] Follow User
- [✅] Unfollow User
- [✅] See Followers w/ Pagination
- [✅] See Following w/ Pagination
- [✅] Computed Fields
- [✅] Search Users

## Photos

- [✅] Upload Photo (Parse #)
- [✅] See Photo
<!-- #food / 2,050,459 posts / photos 이런 기능 -->
- [✅] See Hastag
- [✅] Search Photos
- [✅] Edit Photo
- [✅] Like / Unlike Photo
- [✅] See Photo Likes
- [✅] See Photo Comments
<!-- 내가 팔로우 하는 유저들의 사진을 모아보는 것- pagination: cursor pagination과 offset pagination 마음대로 -->
- [✅] See Feed
<!-- isMine: Comment 작성자 / 내가 Comment를 작성했다면 Comment를 삭제할 수 있는 x 버튼 보여주기 -->
- [✅] IsMine (Delete Photo)

## Comments

- [✅] Comment on Photo
- [✅] Delete Comment (Is Mine)
- [✅] Edit Comment

## Refactor

- [✅] Mutation Responses

## Extra

- [✅] S3 Image Upload

## DMs

- [✅] see Rooms
<!-- 오직 내가 메세지를 보낼 때에만 대화방을 만들고 싶은 거야 -->
- [✅] Send Message (Create Room)
- [✅] see Room
  <!-- 메세지 상에 seen(읽음 표시) 기능 새롭게 구현 / 대화방을 눌렀으면 그 메세지를 읽음 표시가 된다. -->
  <!-- 예를 들어 아직 25개의 읽지 않은 메세지가 있다고 알려주는 것 -->
- [✅] Computed Fields
<!-- 우리가 대화방 안에 들어갈 때 메세지를 화면상에 떠있으면 그 메세지는 읽혔졌다(seen)라고 표시된다. -->
- [✅] See (Read) Message
- [✅] Realtime Messages

<!-- {
  rooms {
    users{
        avatar
        username
    }
    unreadNumber (읽지 않은 메세지 )
  }
  room(방 내부) {
      users{
          avatars
          username
      }
      messages {
          payload (데이터 정보들 예시 아래에 있음 )
          seen True or False (바로 읽음 표시 기능)
      }
  }
} -->
<!-- user와 messages를 room의 field로 더해야 해 왜냐하면 사용자 간의 relationship을 디폴트로 로딩하는 게 아니거든  -->

<!-- payload 뜻! {
	"status" :
	"from": "localhost",
	"to": "http://melonicedlatte.com/chatroom/1",
	"method": "GET",
	"data":{ "message" : "There is a cutty dog!" }
} -->
