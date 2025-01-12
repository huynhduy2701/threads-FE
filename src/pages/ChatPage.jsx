import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Conversation from "../components/Conversation";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "../components/MessageContainer";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  conversationAtom,
  selectedConversationAtom,
} from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";
import { useSocket } from "../../context/SocketContext";
const ChatPage = () => {
  const [loadingConversation, setLoadingConversation] = useState(true);
  const [conversations, setConversations] = useRecoilState(conversationAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const currentUser = useRecoilValue(userAtom);
  const [searchingUser, setSearchingUser] = useState(false);
  const [searchText, setSearchText] = useState("");
  const showToast = useShowToast();
  const {socket,onlineUsers} = useSocket();

  console.log("selectedConversation in Chatpage : ", selectedConversation);
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

  const handleConversationSearch = async (e) => {
    e.preventDefault();
    setSearchingUser(true);
    
    try {
      const res = await fetch(`/api/users/profile/${searchText}`);
      const searchUser = await res.json();
      if (searchUser.error) {
        return showToast("Error", searchUser.error, "error");
      }
      console.log("searchUser in Chatpage : ", searchUser);
      console.log("currentUser in Chatpage : ", currentUser);

      const messagingYourSelf = searchUser._id === currentUser._id;
      if (messagingYourSelf) {
        return showToast(
          "Tìm người dùng",
          "Bạn không thể tìm bạn ở đây",
          "warning"
        );
      }
      console.log("messagingYourSelf in Chatpage : ", messagingYourSelf);
      //nếu user đã tồn tại trong cuộc trò chuyện
      const conversationExist = conversations.find(
        (conversation) => conversation.participants[0]._id === searchUser._id
      );
      if (conversationExist) {
        setSelectedConversation({
          _id: conversationExist._id,
          userId: searchUser._id,
          username: searchUser.username,
          userProfilePic: searchUser.profilePic,
        });
        return;
      }
      console.log(
        "selectedConversation in Chatpage affter search :",
        selectedConversation
      );

      const mockConversation = {
        mock: true,
        lastMessage: {
          text: "",
          sender: "",
        },
        _id: Date.now(),
        participants : [
          {
            _id: searchUser._id,
            username: searchUser.username,
            profilePic: searchUser.profilePic,
          },
        ],
      };
      setConversations((prevConvs) => [...prevConvs, mockConversation]);
    } catch (error) {
      showToast("error", error.message, "error");
    } finally {
      setSearchingUser(false);
    }
  };

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
          <form onSubmit={handleConversationSearch}>
            <Flex alignItems={"center"} gap={2}>
              <Input
                placeholder="Tìm kiếm người dùng..."
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                size={"sm"}
                onClick={handleConversationSearch}
                isLoading={searchingUser}
              >
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
                isOnline={onlineUsers.includes(conversation.participants[0]._id)}
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
};

export default ChatPage;
