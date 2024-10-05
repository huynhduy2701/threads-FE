import { Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast'
import { MdLogout } from "react-icons/md";
const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();
    const handleLogout = async ()=>{
        try {
            localStorage.removeItem("user-threads");
            //fetch
            const res = await fetch("api/users/logout",{
                method : "POST",
                headers:{
                    "Content-Type" : "application/json"
                },

            })
            const data = await res.json();
            console.log(">>> check data in logout",data);

            if (data.error) {
               showToast("Lỗi đăng xuất",data.error,"error");
               return;
            }
            showToast("Đăng xuất",data.message,"success");
            localStorage.removeItem("user-threads");
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
        <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
           <MdLogout fontSize={"30px"}/>
        </Button>
    </>
  )
}

export default LogoutButton