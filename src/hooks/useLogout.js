import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";
import HomePage from "../pages/HomePage";
import { Navigate, useNavigate } from "react-router-dom";
const useLogout = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
   const user = useRecoilValue(userAtom);
   const navigate = useNavigate();
  const logout = async () => {
    try {
      localStorage.removeItem("user-threads");
      //fetch
      const res = await fetch("api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(">>> check data in logout", data);

      if (data.error) {
        showToast("Lỗi đăng xuất", data.error, "error");
        return;
      }
      showToast("Đăng xuất", data.message, "success");
      localStorage.removeItem("user-threads");
      // user ? <HomePage /> : <Navigate to="/auth" />;
      navigate("/auth"); // Điều hướng người dùng đến trang đăng nhập
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};

export default useLogout;
