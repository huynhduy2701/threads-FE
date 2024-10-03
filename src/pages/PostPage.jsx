import { Avatar, Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs";
import Action from "../components/Action";
import Comment from "../components/Comment";
import { useState } from "react";
const PostPage = () => {
  const [liked, setLiked] = useState(false);
   const [repost, setRepost] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/logo-henry.jpg" size={"md"} name="I am Henry" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              iamhenry
            </Text>
            <Image src="/verify.png" w={5} h={5} title="Đã xác minh" />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1d
          </Text>
          <BsThreeDots cursor={"pointer"} />
        </Flex>
      </Flex>

      <Text my={3}>Let's talk about threads.</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light "}
      >
        <Image src={"/post1.png"} w={"full "} />
      </Box>
      <Flex gap={3} my={3}>
        <Action
          liked={liked}
          setLiked={setLiked}
          repost={repost}
          setRepost={setRepost}
        />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          {238 + (repost ? 1 : 0)} replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {200 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post </Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />
      <Comment
        comment="hi henry"
        createAt="2d"
        likes={100}
        username="henry"
        userAvatar="/logo-henry.jpg"
      />
    </>
  );
}

export default PostPage
