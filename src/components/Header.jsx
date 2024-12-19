import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const setAuthSCreen = useSetRecoilState(authScreenAtom)
  const logout = useLogout();
  return (
    <Flex justifyContent={"space-between"} mt={6} mb="12">
      {user && (
        <Link as={RouterLink} to={"/"}>
          <AiFillHome size={24} />
        </Link>
      )}
      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthSCreen("login")}
        >
          Đăng Nhập
        </Link>
      )}
      <Image
        cursor={"pointer"}
        alt="logo"
        w={8}
        src={colorMode == "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
      {user && (
        <Flex alignItems={"center"} gap={4}>
          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>
          <Button size={"sm"} onClick={logout}>
            <MdLogout fontSize={"20px"} />
          </Button>
        </Flex>
      )}
      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthSCreen("signup")}
        >
          Đăng Kí
        </Link>
      )}
    </Flex>
  );
};

export default Header;
