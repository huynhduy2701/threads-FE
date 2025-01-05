import {
  Avatar,
  Divider,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";

const MessageContainer = () => {
  const showToast = useShowToast();
  const  [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
  const [loadingMessage, setLoadingMessage] = useState(true);
  const [messages, setMessages] = useState([]);
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    const getMessage = async () => {

      try {
        const res = await fetch(`/api/messages/${selectedConversation.userId}`);
        const data = await res.json();
        if (data.error) {
          return showToast("Error", data.error, "error");
        }
        console.log("data in MessageContainer : ", data);
        setMessages(Array.isArray(data) ? data : []); // Đảm bảo rằng messages luôn là một mảng
      } catch (error) {
        showToast("error", error.message, "error");
      }finally{
        setLoadingMessage(false);
      }
    };

    getMessage();
  }, [showToast]);
  return (
    <Flex
      flex={70}
      bg={useColorModeValue("gray.100", "gray.dark")}
      borderRadius={"md"}
      flexDirection={"column"}
      p={2}
    >
      {/* Message header  */}
      <Flex w={"full"} h={12} alignItems={"center"} gap={2} pl={2}>
        <Avatar src="" size={"sm"} />
        <Text display={"flex"} alignItems={"center"}>
          Henry <Image src={"/verify.png"} h={4} w={4} ml={1} />
        </Text>
      </Flex>

      <Divider />
      <Flex
        flexDir={"column"}
        gap={4}
        my={4}
        height={"400px"}
        overflowY={"auto"}
      >
        {loadingMessage &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"sm"}
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
            >
              {i % 2 === 0 && <SkeletonCircle size={7} />}
              <Flex flexDir={"column"} gap={2}>
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={7} />}
            </Flex>
          ))}

        {!loadingMessage &&
          messages.map((message) => (
            <Message
              key={message._id}
              message={message}
              ownMessage={currentUser._id === message.sender}
            />
          ))}
      </Flex>

      <MessageInput />
    </Flex>
  );
};

export default MessageContainer;
