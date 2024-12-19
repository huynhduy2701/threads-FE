import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Action from "../components/Action";
import Comment from "../components/Comment";
import { useEffect, useState } from "react";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import postAtom from "../atoms/postAtom";
const PostPage = () => {
  const [user, loading] = useGetUserProfile();
  // const [post, setPost] = useState(null);
  const [posts, setPosts] = useRecoilState(postAtom);
  const showToast = useShowToast();
  const { pid } = useParams();
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userAtom);
  const currentPost = posts[0];

  console.log("user in post page", user);
   const handleDeletePost = async () => {
     try {
       if (!window.confirm("Bạn có chắc chắn xóa không ?")) {
         return;
       }
       const res = await fetch(`/api/post/${currentPost._id}`, {
         method: "DELETE",
       });
       const data = await res.json();
       console.log("data in Post for handleDeletePost ", data);
       if (data.error) {
         return showToast("Lỗi xóa", data.error, "error");
       }
       showToast("Thành công", "Xóa thành công", "success");
       navigate(`/${user.username}`);
     } catch (error) {
       console.error(error.message);
     }
   };
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/post/${pid}`);
        const data = await res.json();
        if (data.error) {
          return showToast("Lỗi", data.error, "error");
        }
        console.log("data in PostPage", data);
        setPosts([data]);
      } catch (error) {
        console.error(error.message);
      }
    };

    getPost();
  }, [showToast, pid, setPosts]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!currentPost) return null;
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilePic} size={"md"} name={user.name} />
          <Flex>
            <Text
              fontSize={"sm"}
              fontWeight={"bold"}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${user.username}`);
              }}
              cursor={"pointer"}
            >
              {user?.name}
            </Text>
            <Image src="/verify.png" w={5} h={5} title="Đã xác minh" />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} w={36} textAlign={"right"} color={"gray.light"}>
            {formatDistanceToNow(new Date(currentPost.createdAt))} trước
          </Text>
          {/* <BsThreeDots cursor={"pointer"} /> */}
          {currentUser?._id === user._id && (
            <DeleteIcon
              size={20}
              onClick={handleDeletePost}
              cursor={"pointer"}
            />
          )}
        </Flex>
      </Flex>

      <Text my={3}>{currentPost.text}</Text>
      {currentPost.img && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"gray.light "}
        >
          <Image src={currentPost.img} w={"full "} />
        </Box>
      )}

      <Flex gap={3} my={3}>
        <Action post={currentPost} />
      </Flex>
      {/* <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          {post.replies.length} replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {post.likes.length} likes
        </Text>
      </Flex> */}
      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post </Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />
      {currentPost.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={
            reply._id ===
            currentPost.replies[currentPost.replies.length - 1]._id
          }
        />
      ))}
    </>
  );
};

export default PostPage;
