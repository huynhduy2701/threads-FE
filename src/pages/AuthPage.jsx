import React, { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { useRecoilValue, useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  // const [value, setValue] = useState("login");
  console.log("check : ", authScreenState);
  // useSetRecoilState(authScreenState);
  return <div>{authScreenState === "login" ? <Login /> : <Signup />}</div>;
};

export default AuthPage;
