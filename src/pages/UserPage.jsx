import { useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post.jsx";
import useGetUserProfile from "../hooks/useGetUserProfile.js";
import { useRecoilState } from "recoil";
import postAtom from "../atoms/postAtom.js";

const UserPage = () => {
  const [user, loading] = useGetUserProfile();
  // const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  // const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useRecoilState(postAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {
    if (!username) return; // Nếu không có username, không gọi API.
    const getPost = async () => {
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/post/user/${username}`);
        const data = await res.json();
        console.log("data in userPage : ", data);

        setPosts(data);
        console.log("posts in userPage : ", posts);
      } catch (error) {
        showToast("Lỗi", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

    // getUser();
    getPost();
  }, [username, showToast, setPosts]);

  console.log("post in userPage : ", posts);

  if (!user && loading)
    return (
      <Flex justifyContent={"center"} alignItems={"center"} height="100vh">
        <Spinner mr={5} />
      </Flex>
    );
  if (!user && !loading)
    return (
      <Flex justifyContent={"center"} alignItems={"center"} height="100vh">
        <Spinner mr={5} />
        Không tìm thấy người dùng ...
      </Flex>
    );
  return (
    <>
      <UserHeader user={user} />
      {/* <UserPost
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
      /> */}
      {!fetchingPosts && posts.length === 0 && (
        <h1>Người dùng này chưa có đăng bài viết</h1>
      )}
      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {/* {posts.map((post) => {
        <Post key={post._id} post={post} postedBy={post.postedBy} />;
      })} */}
      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default UserPage;

