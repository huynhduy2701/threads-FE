import { Avatar, Flex,Text } from "@chakra-ui/react";
import React from "react";

const Message = ({ ownMessage }) => {
  return (
    <>
    {ownMessage ? (
      <Flex
      gap={2}
      alignSelf={"flex-end"}
      >
        <Text maxW={"350px"} bg={"blue.400"} p={2} borderRadius={"xl"}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates aliquam iusto molestias excepturi minus harum eveniet distinctio odio, dolor molestiae, blanditiis iure. Quaerat, eius laudantium nemo dolorem voluptatibus a provident.
        </Text>
        <Avatar src='' w={7} h={7} />
      </Flex>

    ) : (
        <Flex
        gap={2}
        
        >
          <Avatar src='' w={7} h={7} />
          <Text maxW={"350px"} bg={"gray.400"} p={2} borderRadius={"xl"} color={"black"}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          </Text>
        </Flex>
    )}
    </>
  );
};

export default Message;
