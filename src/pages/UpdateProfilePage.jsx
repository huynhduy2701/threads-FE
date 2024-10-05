"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg";

export default function UpdateProfilePage() {
    const [user,setUser] = useRecoilState(userAtom);
    const [inputs,setInputs] = useState({
        name:user.name,
        username:user.username,
        bio:user.bio,
        email:user.email,
        password:""
    })
    console.log(">>> check user in updatePorfile ",user);

    const fileRef = useRef(null);

    const { handleImageChange,imgUrl } = usePreviewImg();


    const handleUpdate = async (e)=>{
        e.preventDefault();
        console.log(inputs);
        try {
            const res = await fetch(`/api/users/update/${user._id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...inputs ,profilePic:imgUrl }),
            });
            const data = await res.json();
            console.log(">>> check data in updatePorfile : ",data);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <form onSubmit={handleUpdate}>
      <Flex align={"center"} justify={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.dark")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
            Chỉnh sửa thông tin người dùng
          </Heading>
          <FormControl id="userName">
            {/* <FormLabel>Icon người dùng</FormLabel> */}
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar
                  size="xl"
                  boxShadow={"md"}
                  src={imgUrl || user.profilePic}
                />
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>
                  Thay đổi ảnh đại diện
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl >
            <FormLabel>Fullname</FormLabel>
            <Input
              placeholder="Nhập đầy đủ họ tên"
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              value={inputs.name}
            />
          </FormControl>
          <FormControl >
            <FormLabel>Username </FormLabel>
            <Input
              placeholder="Nhập địa username"
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              value={inputs.username}
            />
          </FormControl>
          <FormControl >
            <FormLabel>Bio </FormLabel>
            <Input
              placeholder="Nhập  Bio"
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
              value={inputs.bio}
            />
          </FormControl>
          <FormControl >
            <FormLabel>Email </FormLabel>
            <Input
              placeholder="Nhập địa chỉ Email"
              _placeholder={{ color: "gray.500" }}
              type="email"
              disabled
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              value={inputs.email}
            />
          </FormControl>
          <FormControl >
            <FormLabel>Mật khẩu</FormLabel>
            <Input
              placeholder="Nhập mật khẩu mới"
              _placeholder={{ color: "gray.500" }}
              type="password"
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              value={inputs.password}
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Hủy
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              Thay đổi
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
