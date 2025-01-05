import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { selectedConversationAtom } from "../atoms/messagesAtom";

const Conversation = ({ conversation }) => {
  const user = conversation.participants[0];
  const currentUser = useRecoilValue(userAtom);
  const lastMessage = conversation.lastMessage;
  const  [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
  const colorMode = useColorMode();

  // Xử lý giới hạn 10 từ
 const truncateText = (text, maxWords) => {
   if (!text || typeof text !== "string") return ""; // Trả về chuỗi rỗng nếu không hợp lệ
   const words = text.split(" ");
   return (
     words.slice(0, maxWords).join(" ") + (words.length > maxWords ? "..." : "")
   );
 };

 console.log("selectedConversation in conversation : ", selectedConversation);
 
  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={1}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      borderRadius={"md"}
      onClick={() =>
        setSelectedConversation({
          _id: conversation._id,
          userId: user._id,
          userProfilePic: user.profilePic,
          username: user.username,
        })
      }
      bg={
        selectedConversation?._id === conversation._id
          ? (colorMode === "light" ? "gray.600": "gray.dark")
          : ""
      }
    >
      <WrapItem>
        <Avatar size={{ base: "xs", sm: "sm", md: "md" }} src={user.profilePic}>
          <AvatarBadge boxSize={"1em"} bg={"green.500"} />
        </Avatar>
      </WrapItem>

      <Stack direction={"column"} fontSize={"sm"}>
        <Flex alignItems={"center"}>
          <Text fontWeight={700} display={"flex"} alignItems={"center"}>
            {user.username}
          </Text>
          <Image src="/verify.png" w={4} h={4} ml={1} alignItems={"center"} />
        </Flex>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {/* {truncateText(lastMessage.text, 3)} */}
          {/* có thể sử dụng trên  */}
          {currentUser._id === lastMessage.sender ? (
            <BsCheck2All size={16} />
          ) : (
            ""
          )}
          {lastMessage.text.length > 18
            ? lastMessage.text.substring(0, 18) + "..."
            : lastMessage.text}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
