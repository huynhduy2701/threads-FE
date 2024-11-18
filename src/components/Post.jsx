import { Avatar, Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Action from "./Action";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useNavigate } from "react-router-dom";

const Post = ({ post, postedBy }) => {
  const [liked, setLiked] = useState(false);
  const showToast = useShowToast();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();
        console.log("postedBy : ", postedBy);
        console.log("data in Post : ", data);
        if (data.error) {
          return showToast("Lỗi bảng tin", data.error, "error");
        }
        setUser(data);
      } catch (error) {
        showToast("Lỗi", error.message, "error");
        setUser(null);
      }
    };
    getUser();
  }, [postedBy, showToast]);
  if (!user) {
    return null;
  }
  return (
    <Link to={`${user.username}/post/${post._id}`} textDecoration="none">
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size="md"
            name={user?.name}
            src={user?.profilePic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`${user.username}`);
            }}
          />
          <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>😒</Text>}
            {post.replies[0] && (
              <Avatar
                size="xs"
                name="I am Henry"
                src={post.replies[0].userProfilePic}
                position={"absolute"}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
              />
            )}
            {post.replies[1] && (
              <Avatar
                size="xs"
                name="I am Henry 2"
                src={post.replies[1].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                right={"-5px"}
                padding={"2px"}
              />
            )}
            {post.replies[1] && (
              <Avatar
                size="xs"
                name="I am Henry 3"
                src={post.replies[2].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                left={"4px"}
                padding={"2px"}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`${user.username}`);
                }}
              >
                {user?.username}{" "}
              </Text>
              <Image
                src="/verify.png"
                w={5}
                h={5}
                ml={1}
                title="Đã xác minh"
                alignItems={"center"}
              />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                1d
              </Text>
              <BsThreeDots cursor={"pointer"} />
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light "}
            >
              <Image src={post.img} w={"full "} />
            </Box>
          )}

          <Flex gap={3} my={1}>
            <Action liked={liked} setLiked={setLiked} />
          </Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"} textDecoration="none">
              {post.replies.length} Replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"} textDecoration="none">
              {post.likes.length} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;
