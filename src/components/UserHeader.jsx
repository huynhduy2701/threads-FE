import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { CiLink } from "react-icons/ci";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
const UserHeader = ({ user }) => {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom); // user đăng nhập
  const [follwing, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );
  const [updating, setUpdating] = useState(false);
  console.log("following : ", follwing);
  const showToast = useShowToast();

  const copyURL = () => {
    const currentURL = window.location.href; //Trả về URL hiện tại của trang web. Đây là chuỗi chứa toàn bộ địa chỉ URL, ví dụ như https://example.com.
    // console.log(currentURL);
    navigator.clipboard.writeText(currentURL).then(() => {
      //navigator.clipboard: Đây là API của trình duyệt dùng để tương tác với clipboard (bộ nhớ tạm).
      //writeText(currentURL): Đây là phương thức để sao chép nội dung văn bảng vào clipboard. Ở đây, nó sao chép giá trị currentURL (URL hiện tại của trang web).
      console.log("Url copied to clipboard");
      const examplePromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(200), 1000);
      });

      // Will display the loading toast until the promise is either resolved
      // or rejected.
      toast.promise(
        examplePromise,
        {
          success: { title: "Coppy URL thành công" },
          error: { title: "Coppy URL thất bại" },
          loading: { title: "Vui lòng chờ" },
        },
        {
          position: "top",
        }
      );
    });
  };

  const handleFollowAndUnFollow = async () => {
    if (!currentUser) {
      showToast("Lỗi", "Vui Lòng đăng nhập để theo dõi", "error");
      return;
    }
    if (updating) {
      // Đặt trạng thái updating thành true để ngăn người dùng gửi thêm yêu cầu trong khi thao tác đang xử lý.
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("data userHeader : ", data);
      if (data.error) {
        return showToast("Lỗi theo dõi người dùng", data.error, "error");
      }

      if (follwing) {
        showToast("Thành công", `Bỏ theo dõi ${user.name}`, "success");
        user.followers.pop();
      } else {
        showToast("Thành công", `Theo dõi ${user.name}`, "success");
        user.followers.push(currentUser?._id);
      }
      // showToast("Thành công", data.message, "success");
      setFollowing(!follwing);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };
  return (
    // stack Ngăn xếp là thành phần bố cục được sử dụng để nhóm các phần tử lại với nhau và áp dụng khoảng cách giữa chúng.
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text
            fontSize={"2xl"}
            fontWeight={"bold"}
            display={"flex"}
            alignItems={"center"}
          >
            {user.name}
            <Image
              src="/verify.png"
              w={7}
              h={7}
              ml={1}
              title="Đã xác minh"
              alignItems={"center"}
              cursor={"pointer"}
            />
          </Text>

          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username} </Text>

            <Text
              fontSize={{ base: "xs", md: "sm", lg: "md" }}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              threads.next
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
              name={user.name}
              src={user.profilePic}
              size={{
                base: "sm",
                md: "xl", //responsive
              }}
            />
          )}
          {!user.profilePic && (
            <Avatar
              name={user.name}
              src="https://bit.ly/broken-link"
              size={{
                base: "sm",
                md: "xl", //responsive
              }}
            />
          )}
        </Box>
      </Flex>
      <Text>{user.bio}</Text>

      {currentUser?._id === user._id && (
        <Link href="/update" width="full">
          <Button width={"full"} isLoading={updating}>
            Chỉnh sửa trang cá nhân
          </Button>
        </Link>
      )}
      {currentUser?._id !== user._id && (
        <Link width="full">
          <Button
            width={"full"}
            onClick={handleFollowAndUnFollow}
            isLoading={updating}
          >
            {follwing ? "Hủy theo dõi" : "Theo dõi"}
          </Button>
        </Link>
      )}

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <FaInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CiCircleMore size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Coppy Link <CiLink size={24} ml={"10"} />{" "}
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1.5px solid gray"}
          color={"gray.light"}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
