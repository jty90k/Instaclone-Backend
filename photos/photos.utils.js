//hashtags.map으로 만든 배열을 리턴한다.
export const processHashtags = (caption) => {
  const hashtags = caption.match(/#[\w]+/g) || [];
  console.log(hashtags);
  return hashtags.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};
