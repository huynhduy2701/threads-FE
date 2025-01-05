import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Conversation from '../components/Conversation';
import {GiConversation} from "react-icons/gi"
import MessageContainer from '../components/MessageContainer';
import useShowToast from '../hooks/useShowToast';
import { useRecoilState } from 'recoil';
import { conversationAtom, selectedConversationAtom } from '../atoms/messagesAtom';
const ChatPage = () => {
  const showToast = useShowToast();
  const [loadingConversation, setLoadingConversation] = useState(true);
  const [conversations, setConversations] = useRecoilState(conversationAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);

  useEffect(() => {
    const getConversation = async () => {
      setLoadingConversation(true);
      try {
        const res = await fetch("/api/messages/conversations");
        const data = await res.json();
        if (data.error) {
          return showToast("Error", data.error, "error");
        }
        console.log("data in chatPage for getConversation : ", data);
        setConversations(data.conversations);
        console.log("conversations in chatpage ", conversations);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoadingConversation(false);
      }
    };
    getConversation();
  }, [showToast, setConversations]);

  return (
    <Box
      position={"absolute"}
      left={"50%"}
      w={{ base: "100%", md: "80%", lg: "750px" }}
      transform={"translateX(-50%)"}
      p={4}
      // border={"1px solid red"}
    >
      <Flex
        gap={4}
        flexDirection={{ base: "column", md: "row" }}
        maxWidth={{ sm: "400px", md: "full" }}
        mx={"auto"}
      >
        <Flex
          flex={30}
          gap={2}
          flexDirection={"column"}
          maxW={{ sm: "250px", md: "full" }}
          mx={"auto"}
        >
          <Text
            fontWeight={700}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Cuộc trò chuyện của bạn
          </Text>
          <form>
            <Flex alignItems={"center"} gap={2}>
              <Input placeholder="Tìm kiếm người dùng..." />
              <Button size={"sm"}>
                <SearchIcon />
              </Button>
            </Flex>
          </form>
          {loadingConversation &&
            [0, 1, 2, 3, 4].map((_, i) => (
              <Flex
                key={i}
                gap={4}
                alignItems={"center"}
                p={1}
                borderRadius={"md"}
                cursor={"pointer"}
              >
                <Box>
                  <SkeletonCircle size={10} />
                </Box>
                <Flex w={"full"} flexDirection={"column"} gap={3}>
                  <Skeleton h={"10px"} w={"80px"} />
                  <Skeleton h={"8px"} w={"90%"} />
                </Flex>
              </Flex>
            ))}
          {!loadingConversation &&
            conversations.map((conversation) => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
              />
            ))}
        </Flex>

        {!selectedConversation._id && (

        <Flex
          flex={70}
          borderRadius={"md"}
          p={2}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          height={400}
        >
          <GiConversation size={100} />
          <Text fontSize={20}>
            Vui lòng chọn một cuộc trò chuyện để bắt đầu nhắn tin
          </Text>
        </Flex>
        )}

        {/* <Flex flex={70}>Tin Nhắn</Flex> */}
        {selectedConversation._id && <MessageContainer />}
      </Flex>
    </Box>
  );
}

export default ChatPage