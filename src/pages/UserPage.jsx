import UserHeade from "../components/UserHeader"
import UserPost from "../components/UserPost"


const UserPage = () => {
  return (
    <>
      <UserHeade />
      <UserPost
        likes={1200}
        replies={481}
        postImg="/post1.png"
        postTitle="Let's talk about threads ."
      />
      <UserPost
        likes={1200}
        replies={481}
        postImg="/post3.webp"
        postTitle="I am Henry."
      />
    </>
  );
}

export default UserPage
