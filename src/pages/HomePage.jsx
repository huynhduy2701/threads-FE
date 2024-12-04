import { Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";

const HomePage = () => {
  const showToast = useShowToast();
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getFeedPost = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/post/feed");
        const data = await res.json();
        console.log("data homepage : ", data);
        if (data.error) {
          return showToast("Lỗi bảng tin", data.error, "error");
        }
        setPosts(data);
      } catch (error) {
        console.error("error home page : ", error);
      } finally {
        setLoading(false);
      }
    };
    getFeedPost();
  }, [showToast]);
  return (
    <>
      {!loading && post.length === 0 && (
        <h1 style={{ textAlign: "center" }}>
          Bạn vui lòng theo dõi một vài người để có thể xin bảng tin của họ
        </h1>
      )}
      {loading && (
        <Flex justify={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {/* {post.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))} */}
    </>
  );
};

export default HomePage;
