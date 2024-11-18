import { useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost"
import {useParams} from "react-router-dom"
import { useEffect } from "react";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const {username} = useParams();
  const showToast =useShowToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async ()=>{
        try {
          const res = await fetch(`/api/users/profile/${username}`);
          const data = await res.json();
          console.log("data in userPage : " ,data);
          if (data.error) {
              return console.error("Lỗi",data.error);
          }
          setUser(data);
        } catch (error) {
        //  showToast("Lỗi",error,"error");
        console.error(error);
        }finally{
          setLoading(false);
        }
    };
    getUser();
  }, [username]);

  if (!user && loading) return (
    <Flex justifyContent={"center"} alignItems={"center"} height="100vh">
      <Spinner mr={5}/>
      
    </Flex>
  );
    if (!user && !loading)
      return (
        <Flex justifyContent={"center"} alignItems={"center"} height="100vh">
          <Spinner mr={5} />
          Không tìm thấy người dùng ...
        </Flex>
      );
  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={1200}
        replies={481}
        postImg="/post1.png"
        postTitle="Let's talk about threads ."
      />
      <UserPost
        likes={1200}
        replies={481}
        postImg="/post3.webp"
        postTitle="I am Henry."
      />
    </>
  );
}

export default UserPage
