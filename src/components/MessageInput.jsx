import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { IoSendSharp } from "react-icons/io5";

const MessageInput = () => {
  return (
    <form>
      <InputGroup>
        <Input w={"full"} placeholder="Nhập tin nhắn ở đây" />
        <InputRightElement>
          <IoSendSharp color={"green.500"} />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
