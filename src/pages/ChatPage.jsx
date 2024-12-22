import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Conversation from '../components/Conversation';
import {GiConversation} from "react-icons/gi"
import MessageContainer from '../components/MessageContainer';
const ChatPage = () => {
  return (
    <Box
      position={"absolute"}
      left={"50%"}
      w={{ base: "100%", md: "80%", lg: "750px" }}
      transform={"translateX(-50%)"}
      p={4}
      border={"1px solid red"}
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
          {true &&
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
          <Conversation />
          <Conversation />
        </Flex>

        {/* <Flex
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
         */}
        {/* <Flex flex={70}>Tin Nhắn</Flex> */}
        <MessageContainer />
      </Flex>
    </Box>
  );
}

export default ChatPage