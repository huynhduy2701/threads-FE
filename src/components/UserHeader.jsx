import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, useToast, VStack } from "@chakra-ui/react"
import { FaInstagram } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { CiLink } from "react-icons/ci";
const UserHeade = () => {
  const toast = useToast()
  const copyURL = ()=>{
    const currentURL = window.location.href; //Trả về URL hiện tại của trang web. Đây là chuỗi chứa toàn bộ địa chỉ URL, ví dụ như https://example.com.
    // console.log(currentURL);
    navigator.clipboard.writeText(currentURL).then(()=>{
      //navigator.clipboard: Đây là API của trình duyệt dùng để tương tác với clipboard (bộ nhớ tạm).
      //writeText(currentURL): Đây là phương thức để sao chép nội dung văn bản vào clipboard. Ở đây, nó sao chép giá trị currentURL (URL hiện tại của trang web).
      console.log("Url copied to clipboard") ;
      const examplePromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(200), 1000)
      })

      // Will display the loading toast until the promise is either resolved
      // or rejected.
      toast.promise(examplePromise, {
        success: { title: 'Coppy URL thành công'},
        error: { title: 'Coppy URL thất bại'},
        loading: { title: 'Vui lòng chờ' }
        
      },{
        position: 'top'
      })
    }) ;

  }
  return (
    // stack Ngăn xếp là thành phần bố cục được sử dụng để nhóm các phần tử lại với nhau và áp dụng khoảng cách giữa chúng.
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
                Henry
            </Text>
            <Flex gap={2} alignItems={"center"}>
                <Text fontSize={"sm"}>iamHenry</Text>
                <Text 
                    fontSize={{base:"xs",md:"sm",lg:"md"}} 
                    bg={"gray.dark"} 
                    color={"gray.light"} 
                    p={1}
                    borderRadius={"full"}>
                    threads.next
                </Text>
            </Flex>
        </Box>
        <Box>
            <Avatar
            name="Henry"
            src="/logo-henry.jpg"
            size={
              {
                base : "sm",
                md:"xl",//responsive
              }
            }
            />
        </Box>
      </Flex>
      <Text> 
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut hic, commodi cum necessitatibus, veritatis accusantium dolor quaerat
      </Text>
      <Flex w={"full"} justifyContent={"space-between"}>
         <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"}>3.2k followers</Text>
            <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
            <Link color={"gray.light"}>instagram.com</Link>
         </Flex>
          <Flex>
            <Box className="icon-container">
                <FaInstagram size={24} cursor={"pointer"}/>
            </Box>
            <Box className="icon-container">
                <Menu>
                  <MenuButton>
                    <CiCircleMore size={24} cursor={"pointer"}/>
                  </MenuButton>
                  <Portal>
                  <MenuList bg={"gray.dark"}>
                    <MenuItem bg={"gray.dark"} onClick={copyURL}>Coppy Link <CiLink size={24} ml={"10"}/> </MenuItem>
                  </MenuList>
                  </Portal>
                </Menu>
            </Box>
          </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex flex={1} borderBottom={"1.5px solid gray"} color={"gray.light"} justifyContent={"center"} pb={3} cursor={"pointer"}>
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  )
}

export default UserHeade
