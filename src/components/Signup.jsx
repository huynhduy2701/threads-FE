"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    username : "",
    email: "",
    password : "",
  })

  const toast = useToast();
  const handleSignup = async ()=>{
    console.log(inputs);
    setLoading(true);
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST", //Định nghĩa loại yêu cầu HTTP là POST. Yêu cầu POST thường được dùng để gửi dữ liệu tới máy chủ (trong trường hợp này là dữ liệu đăng ký người dùng).
        headers: {
          //"Content-Type": "application/json" cho máy chủ biết rằng dữ liệu mà client (frontend) gửi đến là ở định dạng JSON. Điều này giúp máy chủ hiểu và xử lý đúng cách dữ liệu này.
          "Content-Type": "application/json",
        },
        body : JSON.stringify(inputs)
      });
      const data = await res.json(); 
      // console.log(data);
      if(data.error){
        console.log(data.error);
       toast({
         title: ` Lỗi đăng kí`,
         position: 'top',
         status: 'error',
         isClosable: true,
         description: data.error,
         duration:3000,
       });
       return;
      }
      showToast("Đăng kí",data.message,"success");
      localStorage.setItem("user-threads",JSON.stringify(data));
      setUser(data);
      
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Đăng kí
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input type="text" 
                  onChange={(e) => setInputs({...inputs,name :e.target.value})}
                  value={inputs.name}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" 
                  onChange={(e)=> setInputs({...inputs,username : e.target.value})}
                  value={inputs.username}
                  />
                </FormControl>
              </Box>
            <FormControl isRequired>
              <FormLabel>Email </FormLabel>
              <Input type="email"
              onChange={(e)=>setInputs({...inputs,email : e.target.value})}
              value={inputs.email}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Mật khẩu</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} onChange={(e)=> setInputs({...inputs,password:e.target.value})}  value={inputs.password}/>
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
               
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
                onClick={handleSignup}
                isLoading={loading}
              >
                Đăng kí
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Bạn đã có tài khoản ?{" "}
                <Link color={"blue.400"} onClick={() => setAuthScreen('login')}>
                  Đăng nhập
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
